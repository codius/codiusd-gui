const Admin = require('../lib/admin')
const { podInfoAlias, manifestInfoAlias } = require('../util/alias')
const { podInfoFormat, manifestInfoFormat } = require('../util/formatInfo')

class PodController {
  constructor (deps) {
    this.admin = deps(Admin)
  }

  async init (router) {
    router.get('/info/pods', async ctx => {
      const podList = await this.admin.query('getPods')
      const { uri } = await this.admin.query('info')
      const baseUri = uri.split('://')[1]
      await ctx.render('pods', {
        pods: podList.running,
        uri: baseUri
      })
    })

    router.get('/info/podInfo', async ctx => {
      const podInfoRaw = await this.admin.query('getPodInfo', {
        id: ctx.query.id
      })

      let podInfo = {}
      Object.keys(podInfoRaw).map((key) => {
        if (podInfoFormat[key]) {
          podInfoRaw[key] = podInfoFormat[key](podInfoRaw, key)
        }

        if (podInfoAlias[key]) {
          podInfo[podInfoAlias[key]] = podInfoRaw[key]
        }
      })       

      const { manifest } = await this.admin.query('pods', {
        manifestHash: ctx.query.id
      })

      let manifestInfo = {} 
      Object.keys(manifest).map((key) => {
        let manifestVal = manifest[key]

        if (manifestInfoFormat[key]) {
          manifestVal = manifestInfoFormat[key](manifestVal)
        }

        if (manifestInfoAlias[key]) {
          manifestInfo[manifestInfoAlias[key]] = manifestVal
        }
      })

      await ctx.render('podinfo', {
        podInfo: podInfo,
        manifestInfo: manifestInfo,
        manifest: JSON.stringify(manifest, null, 2)
      })
    })
  }
}

module.exports = PodController
