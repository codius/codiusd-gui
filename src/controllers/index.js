const Admin = require('../lib/admin')
const moment = require('moment')
const { hostInfoAlias, memoryInfoAlias } = require('../util/alias')
const { hostInfoFormat, memoryInfoFormat } = require('../util/formatInfo')


const fs = require('fs-extra')
const path = require('path')

const staticJS = [
  'index.js',
  'favicon.ico'
].map((file) => path.resolve(__dirname, '../../static/' + file))

class IndexController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/', async ctx => {
      await ctx.render('index')
    })

    router.get('/info/home', async ctx => {
      const hostInfoRaw = await this.admin.query('info')
      const version = await this.admin.query('version')
      const memoryInfoRaw = await this.admin.query('memory')

      const versionInfo = { 'Version': version.version }

      let memoryInfo = {}
      Object.keys(memoryInfoRaw).map((key) => {
        if (memoryInfoFormat[key]) {
          memoryInfoRaw[key] = memoryInfoFormat[key](memoryInfoRaw[key])
        }

        if (memoryInfoAlias[key]) {
          memoryInfo[memoryInfoAlias[key]] = memoryInfoRaw[key]
        }
      })

      let hostInfo = {}
      Object.keys(hostInfoRaw).map((key) => {
        if (hostInfoFormat[key]) {
          hostInfoRaw[key] = hostInfoFormat[key](hostInfoRaw, key)
        }
        if (hostInfoAlias[key]) {
          hostInfo[hostInfoAlias[key]] = hostInfoRaw[key]
        }
      })

      console.log(hostInfo)
      await ctx.render('home', {
        hostInfo: hostInfo,
        versionInfo: versionInfo,
        memoryInfo: memoryInfo
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
