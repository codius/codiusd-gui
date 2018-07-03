const { formatUptime, formatTimestamp } = require('../lib/time')

const hostInfoFormat = {
  serverUptime: formatUptime,
  serviceUptime: formatUptime
}

const earningsInfoFormat = {
  aggregate_pod_uptime: formatUptime
}

const memoryInfoFormat = {
  freeMem: function (memory) {
    return memory + ' bytes'
  }
}

const podInfoFormat = {
  start: formatTimestamp,
  expirty: formatTimestamp
}

module.exports = { hostInfoFormat, earningsInfoFormat, memoryInfoFormat }