const Admin = require('../lib/admin')

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

    router.get('/info/pods', async ctx => {
      const podList = await this.admin.query('getPods')
      console.log('podList: ', podList)
      await ctx.render('pods', {
        pods: podList.running
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