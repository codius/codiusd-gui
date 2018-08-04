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
      try {
        const res = await this.admin.query('config', {}, {hostCostPerMonth: parseInt(newVal)})
        return res
      } catch (e) {
        console.log('admin query err=', e)
        return
      }
    })
  }
}

module.exports = EarningsController
