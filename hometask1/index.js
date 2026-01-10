import { mikeLog, mikeReadLogs } from './mikelogger.js'

mikeLog('APP STARTED')

setTimeout(() => {
  mikeLog('FIRST TIMEOUT EVENT')
}, 2000)

let mikeCount = 0

const mikeInterval = setInterval(() => {
  mikeCount++
  mikeLog('INTERVAL TICK')

  if (mikeCount === 3) {
    clearInterval(mikeInterval)
  }
}, 1000)

setTimeout(() => {
  const allLogs = mikeReadLogs()
  if (allLogs) {
    console.log('📜 BARCHA LOGLAR:\n')
    console.log(allLogs)
  }
}, 6000)
