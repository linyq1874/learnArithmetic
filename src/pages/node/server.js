const http = require('http')

// http
//   .createServer((req, res) => {
//     if (req.url === '/') {
//       res.setHeader('Content-Type', 'text/plain')
//       res.setHeader('Content-Length', 10)
//       res.write('helloworld')
//     }
//   })
//   .listen(3000, () => {
//     console.log('start ok: http://localhost:3000')
//   })

http
  .createServer((req, res) => {
    if (req.url !== '/favicon.ico') {
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.setHeader('Content-Length', 10)
      res.setHeader('Transfer-Encoding', 'chunked')
      res.write('helloworld.<br/>')

      setTimeout(() => {
        res.write('第一次 <br/>')
      }, 1000)

      setTimeout(() => {
        res.write('第二次 <br/>')
        res.end()
      }, 2000)
    }
  })
  .listen(3000, () => {
    console.log('start ok: http://localhost:3000')
  })
