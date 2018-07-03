const Admin = require('../lib/admin')
const { memoryInfoAlias } = require('../util/alias')
const { memoryInfoFormat } = require('../util/formatInfo')

class ServerController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/info/serverInfo', async ctx => {
      const serverInfoRaw = await this.admin.query('info')
      const memoryInfoRaw = await this.admin.query('memory')

      let memoryInfo = {}
      Object.keys(memoryInfoRaw).map((key) => {
        if (memoryInfoFormat[key]) {
          memoryInfoRaw[key] = memoryInfoFormat[key](memoryInfoRaw[key])
        }

        memoryInfo[memoryInfoAlias[key]] = memoryInfoRaw[key]
      })

      await ctx.render('server', {
        serverInfo: serverInfoRaw,
        memoryInfo: memoryInfo
      })
    })
  }
}

module.exports = ServerController
