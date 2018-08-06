const fetch = require('node-fetch')
const ADMIN_API_PORT = process.env.ADMIN_API_PORT || 3001
const ADMIN_URI = 'http://localhost:' + ADMIN_API_PORT
const CODIUS_HOST_PORT = process.env.CODIUS_HOST_PORT || 3000
const CODIUS_HOST_URI = 'http://localhost:' + CODIUS_HOST_PORT

const ADMIN_ENDPOINTS = {
  getPods: 'GET',
  getPodInfo: 'GET',
  getAllUptime: 'GET',
  config: 'POST'
}

const HOST_ENDPOINTS = {
  info: 'GET',
  memory: 'GET',
  version: 'GET',
  peers: 'GET',
  pods: 'GET'
}

class Admin {
  static get ADMIN_ENDPOINTS () {
    return ADMIN_ENDPOINTS
  }

  static get HOST_ENDPOINTS () {
    return HOST_ENDPOINTS
  }

  async fetchPath (path, method, payload = {}) {
    let res
    if (method === 'GET') {
      res = await fetch(path, {
        method: method
      })
    } else {
      res = await fetch(path, {
        method: method,
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      })
    }

    return res
  }

  async query (command, vars = {}, payload = {}) {
    console.log(payload)
    const stringifyPayload = JSON.stringify(payload)
    const query = await this.varBuilder(vars)
    const path = '/' + command + query
    console.log('PATH: ', path)
    let res
    if (command in HOST_ENDPOINTS) {
      res = await this.fetchPath(CODIUS_HOST_URI + path, 
        HOST_ENDPOINTS[command],
        payload
      )
    } else {
      res = await this.fetchPath(ADMIN_URI + path,
        ADMIN_ENDPOINTS[command],
        payload
      )
    }
    console.log(res.status)

    let ret
    try {
      ret = await res.json()
    } catch (e) {
      console.log(e)
      ret = res
    }
    console.log('query ret: ', ret)
    return ret
  }
  
  async varBuilder (vars) {
    let varArr = []
    for (let item in vars) {
      varArr.length > 0 ? varArr.push('&' + item + '=' + vars[item]) : varArr.push('?' + item + '=' + vars[item])
    }

    return varArr.join('')
  }
}

module.exports = Admin
