const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname + '/../public')
var port = process.env.PORT || 3000
var app  = express()

var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    console.log('connection made')

    // 
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat App'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Added'))
    
    socket.on('createMessage', (message, callback) => {
        console.log('message', message)
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('Message from server')
    })

    socket.on('disconnect', () => {
        console.log('disconnected from client')
    })
})

server.listen(port, () => {
    console.log(`Server is up at Port ${port}`)
})