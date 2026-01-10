import http from 'http'
import {
  mikecoderStudents,
  mikecoderAddStudent,
  mikecoderStudentsCount
} from './mikecoderDb.js'

const mikecoderStats = {
  totalRequests: 0,
  lastRequestTime: null
}

function mikecoderTrackRequest(req) {
  mikecoderStats.totalRequests++
  mikecoderStats.lastRequestTime = new Date().toISOString()

  console.log(
    `[REQUEST] ${req.method} ${req.url}`
  )
}

const mikecoderServer = http.createServer((req, res) => {
  mikecoderTrackRequest(req)

  if (req.url === '/students' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      students: mikecoderStudents,
      studentsCount: mikecoderStudentsCount()
    }))
  }

  else if (req.url === '/add-student' && req.method === 'POST') {
    const student = mikecoderAddStudent('Mike', 16)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(student))
  }

  else if (req.url === '/stats' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      totalRequests: mikecoderStats.totalRequests,
      studentsCount: mikecoderStudentsCount(),
      lastRequestTime: mikecoderStats.lastRequestTime
    }))
  }

  else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

mikecoderServer.listen(3000, () => {
  console.log('🚀 Mikecoder server running on http://localhost:3000')
})
