const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const WebSocket = require('ws')

const wss = new WebSocket.Server({ server: server })

wss.on('connection', ws => {
  // 监听客户端消息
  ws.on('message', message => {
    let msgData = JSON.parse(message)
    if (msgData.type === 'open') {
      // 初始连接时标识会话
      ws.sessionId = `${msgData.fromUserId}-${msgData.toUserId}`
    } else {
      let sessionId = `${msgData.toUserId}-${msgData.fromUserId}`
      wss.clients.forEach(client => {
        console.log('client.sessionId:', client.sessionId)
        if (client.sessionId === sessionId) {
          client.send(message)
        }
      })
    }

    console.log(ws.sessionId)
  })

  // 连接关闭
  ws.on('close', () => {
    console.log('连接关闭')
  })
})

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './client.html'))
})
app.get('/2', function(req, res) {
  res.sendFile(path.join(__dirname, './client2.html'))
})

server.listen(3000, function() {
  console.log('http://localhost:3000')
})
