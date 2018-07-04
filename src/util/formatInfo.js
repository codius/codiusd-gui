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
  expiry: formatTimestamp,
  totalUptime: formatUptime
}

module.exports = { hostInfoFormat, earningsInfoFormat, memoryInfoFormat, podInfoFormat }