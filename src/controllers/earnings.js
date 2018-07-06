const Admin = require('../lib/admin')
const { earningsInfoAlias } = require('../util/alias')
const { earningsInfoFormat } = require('../util/formatInfo')

class EarningsController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/info/earnings', async ctx => {
      const earningsRaw = await this.admin.query('getAllUptime')
      console.log(earningsRaw)
      let earnings = {}
      Object.keys(earningsRaw).map((key) => {
        if (earningsInfoFormat[key]) {
          earningsRaw[key] = earningsInfoFormat[key](earningsRaw, key)
        }
        if (earningsInfoAlias[key]) {
          earnings[earningsInfoAlias[key]] = earningsRaw[key]
        }
      })

      await ctx.render('earnings', {
        earningsInfo: earnings
      })
    })
  }
}

module.exports = EarningsController
