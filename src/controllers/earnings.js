const Admin = require('../lib/admin')
const { earningsInfoAlias } = require('../util/alias')

class EarningsController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/info/earnings', async ctx => {
      const earningsRaw = await this.admin.query('getAllUptime')
      let earnings = {}
      Object.keys(earningsRaw).map((key) => {
        earnings[earningsInfoAlias[key]] = earningsRaw[key]
      })

      await ctx.render('earnings', {
        earningsInfo: earnings
      })
    })
  }
}

module.exports = EarningsController
