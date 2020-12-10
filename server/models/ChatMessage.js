const mongoose = require('mongoose')
const ChatRoom = require('./ChatRoom')
const User = require('./User')

const ChatMessage = new mongoose.Schema(
    {
        chatroom: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: ChatRoom,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: User,
        },
        message: {
            type: String,
            required: true
        }
    },
)

module.exports = mongoose.model("ChatMessage", ChatMessage)