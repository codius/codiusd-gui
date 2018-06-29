const moment = require('moment')

function formatUptime (uptime) {
  const duration = moment.duration(uptime, 'seconds')
  let times = []
  duration.years() > 0 ? times.push(duration.years() + ' years') : undefined
  duration.months() > 0 ? times.push(duration.months() + ' months') : undefined
  duration.days() > 0 ? times.push(duration.days() + ' days') : undefined
  duration.hours() > 0 ? times.push(duration.hours() + ' hours') : undefined
  duration.minutes() > 0 ? times.push(duration.minutes() + ' minutes') : undefined
  duration.seconds() > 0 ? times.push(duration.seconds() + ' seconds') : undefined
  duration.milliseconds() > 0 ? times.push(duration.milliseconds() + ' milliseconds') : undefined

  return times.join(' ')
}

const hostInfoFormat = {
  serverUptime: formatUptime,
  serviceUptime: formatUptime
}

module.exports = { hostInfoFormat }