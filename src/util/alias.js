const hostInfoAlias = {
  acceptingUploads: 'Accepting Uploads',
  serverUptime: 'Server Uptime',
  serviceUptime: 'Codiusd Uptime',
  avgLoad: 'Average Load',
  numPeers: 'Total Peers',
  currency: 'Currency',
  costPerMonth: 'Cost Per Month',
  uri: 'URI',
  runningContracts: 'Running Contracts'
}

const earningsInfoAlias = {
  aggregate_pod_uptime: 'Combined Pod Uptime',
  aggregate_earnings: 'Total Earnings'
}

const memoryInfoAlias = {
  freeMem: 'Free Memory'
}

const podInfoAlias = {
  id: 'ID',
  start: 'Upload Date',
  expiry: 'Expiration Date',
  memory: 'Machine Memory',
  totalUptime: 'Total Uptime',
  port: 'Port',
  ip: 'IP Address'
}

const manifestInfoAlias = {
  name: 'Name',
  machine: 'Machine Type',
  version: 'Version',
  containers: 'Containers'
}

module.exports = { 
  hostInfoAlias,
  earningsInfoAlias,
  memoryInfoAlias,
  podInfoAlias,
  manifestInfoAlias
}