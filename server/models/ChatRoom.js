const mongoose = require('mongoose')

const ChatRoom = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    },
)

module.exports = mongoose.model("ChatRoom", ChatRoom)