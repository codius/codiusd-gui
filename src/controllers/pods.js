const Admin = require('../lib/admin')

const fs = require('fs-extra')
const path = require('path')

class PodController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/info/podInfo', async (ctx) => {
      const info = await this.admin.query('getPodInfo', {
        id: ctx.query.id
      })

      await ctx.render('podinfo', {
        podInfo: info
      })
    })
  }
}

module.exports = PodController
