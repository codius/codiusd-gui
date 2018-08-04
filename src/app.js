const Koa = require('koa')
const Router = require('koa-router')
const Parser = require('koa-bodyparser')
const Views = require('koa-views')
const path = require('path')
const riverpig = require('riverpig')

const IndexController = require('./controllers/index')
const PodsController = require('./controllers/pods')
const EarningsController = require('./controllers/earnings')
const PeersController = require('./controllers/peers')
const PriceController = require('./controllers/price')

class App {
  constructor (deps) {
    this.index = deps(IndexController)
    this.pods = deps(PodsController)
    this.earnings = deps(EarningsController)
    this.peers = deps(PeersController)
    this.price = deps(PriceController)

    this.router = Router()
    this.parser = Parser()

    this.logger = riverpig('codiusd-gui:app')

    this.views = Views(path.resolve(__dirname, '../views'), {
      extension: 'pug'
    })

    this.app = new Koa()
  }
    async listen () {
      this.logger.info('creating app')

      const server = this.app
        .use(this.parser)
        .use(this.views)
        .use(this.router.routes())
        .use(this.router.allowedMethods())
        .listen(process.env.PORT || 3300, '127.0.0.1')
      this.logger.info('listening on: ' + (process.env.PORT || 3300))

      await this.index.init(this.router)
      await this.pods.init(this.router)
      await this.earnings.init(this.router)
      await this.peers.init(this.router)
      await this.price.init(this.router)
      this.logger.info('codiusd-gui ready')
    }
  }

  module.exports = App