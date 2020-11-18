const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const publicPath = path.join(__dirname + '/../public')
var port = process.env.PORT || 3000
var app  = express()

var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('connection made')
    
    socket.on('createMessage', (message) => {
        console.log('message', message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        })
    })

    socket.on('disconnect', () => {
        console.log('disconnected from client')
    })
})

server.listen(port, () => {
    console.log(`Server is up at Port ${port}`)
})