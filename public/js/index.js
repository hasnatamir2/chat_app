var socket = io()

socket.on('connect', () => {
    console.log('connected to server')
    
})

socket.on('disconnect', () => {
    console.log('disconnected from server')
})

socket.on('newMessage', (message) => {
    console.log('newMessage', message)
    var chat = jQuery('<li></li>')
    chat.text(`${message.from}: ${message.text}`)

    jQuery('#chat-messages').append(chat)
})

// socket.emit('createMessage', {
//     from: 'faizan',
//     test: 'hello g'
// }, (data)=>{
//     console.log('got it ', data)
// })

jQuery('#message-form').on('submit', (event)=>{
    event.preventDefault()

    socket.emit('createMessage', {
        from: 'Hasnat',
        text: jQuery('[name=text]').val()
    }, ()=>{})
})