const moment = require('moment')

function formatUptime (uptime) {
  console.log('uptime: ', uptime)
  if (uptime === '0') {
    return '0 seconds'
  }

  console.log('time wasn\'t 0')
  console.log(typeof uptime)

  const duration = moment.duration(Number(uptime), 'seconds')
  let times = []
  duration.years() > 0 ? times.push(duration.years() + ' years') : undefined
  duration.months() > 0 ? times.push(duration.months() + ' months') : undefined
  duration.days() > 0 ? times.push(duration.days() + ' days') : undefined
  duration.hours() > 0 ? times.push(duration.hours() + ' hours') : undefined
  duration.minutes() > 0 ? times.push(duration.minutes() + ' minutes') : undefined
  duration.seconds() > 0 ? times.push(duration.seconds() + ' seconds') : undefined
  duration.milliseconds() > 0 ? times.push(duration.milliseconds() + ' milliseconds') : undefined

  const ret = times.length > 0 ? times.join(' ') : '0 seconds'

  return ret
}

function formatTimestamp (timestamp) {
  const time = moment(timestamp)
  return time.format('MMMM Do YYYY, h:mm:ss a')
}

module.exports = { formatUptime, formatTimestamp }
