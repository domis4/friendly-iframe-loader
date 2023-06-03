const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'index.html')

  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.writeHead(500)
      res.end('Internal Server Error')
      return
    }

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(content)
  })
})

const port = 8081
server.listen(port, () => {
  console.log(`Server Up: http://localhost:${port}`)
})
