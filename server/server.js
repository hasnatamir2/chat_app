const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config()

mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

mongoose.connection.on('error', err => {
    console.log('mongoose connection error', err.message)
})

mongoose.connection.once('open', ()=> {
    console.log('mongoDB connected')
})

require('./models/ChatMessage')
require('./models/ChatRoom')
require('./models/User')

var port = process.env.PORT || 8081

const server = app.listen(port, () => {
    console.log(`server up and running on port ${port}`)
})

const io = require("socket.io")(server)
const jwt = require('jsonwebtoken')

const Message = require('./models/ChatMessage')
const User = require('./models/User')

io.use( async (socket, next) => {
    try{
        console.log(token)
        const token = socket.handshake.query.token
        const payload = jwt.verify(token, process.env.SALT)
        socket.userId = payload.id
        next()
    }catch(err){
        console.err(err)
    }
})

io.on('connection', socket => {
    console.log("connected"+ socket)
    // console.log(socker)

    socket.on("disconnect", ()=>{
        console.log("disconnected" + socket.userId)
    })

    socket.on('joinRoom', ({chatroomId}) => {
        socket.join(chatroomId)
    })

    socket.on('leaveRoom', ({chatroomId}) => {
        socket.leave(chatroomId)
    })

    socket.on('chatroomMessage', async ({chatroomId, message})=>{
        if(message.trim().length > 0){
            console.log(socket)
            const user = await User.findOne({ id: socket.userId})
            const message = new Message({
                chatroom: chatroomId,
                user: socket.userId,
                message,
            })
            io.on(chatroomId).emit('newMessage', {
                message,
                name: user.name,
                userId: socket.userId,
            })
            await message.save()
        }
    })
})