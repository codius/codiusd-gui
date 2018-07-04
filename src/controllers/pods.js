const Admin = require('../lib/admin')
const { manifestInfoAlias } = require('../util/alias')
const { podInfoFormat } = require('../util/formatInfo')

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
      const podInfo = await this.admin.query('getPodInfo', {
        id: ctx.query.id
      })

      Object.keys(podInfo).map((key) => {
        if (podInfoFormat[key]) {
          podInfo[key] = podInfoFormat[key](podInfo[key])
        }
      })       

      const { manifest } = await this.admin.query('pods', {
        manifestHash: ctx.query.id
      })

      let manifestInfo = {} 
      Object.keys(manifest).map((key) => {
        if (manifestInfoAlias[key]) {
          manifestInfo[manifestInfoAlias[key]] = manifest[key]
        }
      })

      await ctx.render('podinfo', {
        podInfo: podInfo,
        manifestInfo: manifestInfo
      })
    })
  }
}

module.exports = PodController
