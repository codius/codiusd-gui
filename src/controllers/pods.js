const Admin = require('../lib/admin')

class PodController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/info/pods', async ctx => {
      const podList = await this.admin.query('getPods')
      await ctx.render('pods', {
        pods: podList.running
      })
    })

    router.get('/info/podInfo', async ctx => {
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
