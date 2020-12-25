const http = require('http')
const handler = require('github-webhook-handler')({ path: '/', secret: '' })
const deploy = require('./deploy')

http.createServer((req, res) => {
  handler(req, res, (err) => {
    res.statusCode = 404
    res.end('404')
  })
}).listen(80)

handler.on('error', (err) => {
  console.error(err.message)
})

handler.on('push', (event) => {
  console.log(event)
  try {
    deploy()
  } catch (e) {
    console.log(e)
  }
})

