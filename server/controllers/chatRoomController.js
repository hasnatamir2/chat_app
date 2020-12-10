const ChatRoom = require('../models/ChatRoom')

exports.createChatRoom = async (req, res)=> {
    const {name} = req.body
    const nameRegex = /^[A-Za-z]+$/

    if(!nameRegex.test(name)) throw "Chatroom name must be Alphabets only"
    
    // console.log(nameRegex.test(name))
    const chatRoomExsists = await ChatRoom.findOne({name})

    if(chatRoomExsists) throw "Chatroom already exsist"

    const chatRoom = new ChatRoom({
        name,
    })

    await chatRoom.save()

    res.json({
        message: 'Chat Room Created!'
    })
}