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
      let earnings = {}
      Object.keys(earningsRaw).map((key) => {
        if (earningsInfoFormat[key]) {
          console.log('format key: ', key, 'old value=', earningsRaw[key])
          earningsRaw[key] = earningsInfoFormat[key](earningsRaw[key])
          console.log('format key: ', key, 'new value=', earningsRaw[key])
        }
        earnings[earningsInfoAlias[key]] = earningsRaw[key]
      })

      await ctx.render('earnings', {
        earningsInfo: earnings
      })
    })
  }
}

module.exports = EarningsController
