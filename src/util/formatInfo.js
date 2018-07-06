const { formatUptime, formatTimestamp } = require('../lib/time')

const hostInfoFormat = {
  serverUptime: formatUptime,
  serviceUptime: formatUptime
}

const earningsInfoFormat = {
  aggregate_pod_uptime: formatUptime,
  aggregate_earnings: function (earningsRaw, key) {
    return earningsRaw[key] + ' ' + earningsRaw['currency']
  }
}

const memoryInfoFormat = {
  freeMem: function (memory) {
    return (memory / 1000000).toFixed(3) + ' megabytes'
  }
}

const podInfoFormat = {
  start: formatTimestamp,
  expiry: formatTimestamp,
  totalUptime: formatUptime
}

const manifestInfoFormat = {
  containers: function (containers) {
    let containerIds = []

    for (index in containers) {
      console.log(containers[index].id)
      containerIds.push(containers[index].id)
    }

    return containerIds
  }
}

module.exports = {
  hostInfoFormat,
  earningsInfoFormat,
  memoryInfoFormat,
  podInfoFormat,
  manifestInfoFormat
}