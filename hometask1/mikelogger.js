import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mikeLogPath = path.join(__dirname, 'logs.txt')

export function mikeLog(message) {
  const time = new Date().toISOString()
  const logLine = `${time} - ${message}\n`

  fs.appendFile(mikeLogPath, logLine, (err) => {
    if (err) {
      console.error('❌ Log yozishda xatolik:', err.message)
    }
  })
}

export function mikeReadLogs() {
  try {
    const data = fs.readFileSync(mikeLogPath, 'utf-8')
    return data
  } catch (err) {
    console.error('❌ Loglarni o‘qib bo‘lmadi:', err.message)
    return null
  }
}
