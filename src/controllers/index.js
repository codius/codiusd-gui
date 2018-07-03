const Admin = require('../lib/admin')
const moment = require('moment')
const { hostInfoAlias } = require('../util/alias')
const { hostInfoFormat } = require('../util/formatInfo')


const fs = require('fs-extra')
const path = require('path')

const staticJS = [
  'index.js'
].map((file) => path.resolve(__dirname, '../../static/' + file))

class IndexController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/', async ctx => {
      await ctx.render('index')
    })

    router.get('/info/home', async ctx => {
      const hostInfoRaw = await this.admin.query('info')
      const version = await this.admin.query('version')

      let hostInfo = {}
      Object.keys(hostInfoRaw).map((key) => {
        if (hostInfoFormat[key]) {
          hostInfoRaw [key] = hostInfoFormat[key](hostInfoRaw[key])
        }
        hostInfo[hostInfoAlias[key]] = hostInfoRaw[key]
      })

      console.log(hostInfo)
      await ctx.render('home', {
        hostInfo: hostInfo,
        version: version
      })
    })

    staticJS.forEach((file) => {
      router.get('/' + path.basename(file), async (ctx) => {
        ctx.set('Content-Type', 'text/javascript')
        ctx.body = await fs.readFile(file)
      })
    })
  }
}

module.exports = IndexController
