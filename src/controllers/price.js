const Admin = require('../lib/admin')
const { earningsInfoAlias } = require('../util/alias')
const { earningsInfoFormat } = require('../util/formatInfo')

class EarningsController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/info/price', async ctx => {
      await ctx.render('price')
    })

    router.post('/actions/price', async ctx => {
      const newVal = ctx.request.body.price
      console.log(newVal)
      await this.admin.query('postConfig', {}, {'hostCostPerMonth': newVal})
    })
  }
}

module.exports = EarningsController
