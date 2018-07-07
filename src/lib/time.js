const moment = require('moment')

function formatUptime (rawInfo, key) {
  const uptime = rawInfo[key]

  if (uptime === '0') {
    return '0 seconds'
  }

  const duration = moment.duration(Number(uptime), 'seconds')
  let times = []
  duration.years() > 0 ? times.push(duration.years() + ' year(s) ') : undefined
  duration.months() > 0 ? times.push(duration.months() + ' month(s) ') : undefined
  duration.days() > 0 ? times.push(duration.days() + ' day(s) ') : undefined
  times.push(('00' + duration.hours()).slice(-2))
  times.push(':' + ('00' + duration.minutes()).slice(-2))
  times.push(':' + ('00' + duration.seconds()).slice(-2))
  times.push('.' + ('000' + duration.milliseconds()).slice(-3))

  const ret = times.length > 0 ? times.join('') : '0 seconds'

  return ret
}

function formatTimestamp (rawInfo, key) {
  const timestamp = rawInfo[key]
  const time = moment(timestamp)
  console.log(time)
  return time.format('MMMM Do YYYY, h:mm:ss a')
}

module.exports = { formatUptime, formatTimestamp }
