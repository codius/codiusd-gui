const Admin = require('../lib/admin')

class PeerController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/info/peers', async ctx => {
      const peersInfo = await this.admin.query('peers')
      await ctx.render('peers', {
        peersInfo: peersInfo.peers
      })
    })
  }
}

module.exports = PeerController
