var socket = io()

var scrollToBottom =() => {
    var messages = jQuery('#chat-messages')
    var newMessage = messages.childern('li:last-childern')

    var clientHeight = messages.prop('clientHeight')
    var scrollTop = messages.props('scrollTop')
    var scrollHeight = messages.props('scrollHeight')
    var newMessageHeight = messages.innerHeight()
    var lastMessageHeight = messages.prev().innerHeight()

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', () => {
    console.log('connected to server')
    
})

socket.on('disconnect', () => {
    console.log('disconnected from server')
})

socket.on('newMessage', (message) => {
    // console.log('newMessage', message)
    var formattedTimeStamp = moment(message.createdAt).format('h:mm a')
    var chat = jQuery('<li></li>')
    chat.text(`${message.from} ${formattedTimeStamp}: ${message.text}`)

    jQuery('#chat-messages').append(chat)
})

socket.on('newLocationMessage', (message)=> {
    var li = jQuery('<li></li>')
    var formattedTimeStamp = moment(message.createdAt).format('h:mm a')
    var a = jQuery('<a target="_blank">My Location</a>')
    li.text(`${message.from} ${formattedTimeStamp}`)
    a.attr('href', message.url)
    li.append(a)
    jQuery('#chat-messages').append(li)
    scrollToBottom()
})

jQuery('#message-form').on('submit', (event)=>{
    event.preventDefault()

    socket.emit('createMessage', {
        from: 'Hasnat',
        text: jQuery('[name=text]').val()
    }, ()=>{})
})

var locationPosition = jQuery('#location')
locationPosition.on('click', ()=> {
    if(!navigator.geolocation){
        return alert('Geolocation not supported by Browser')
    }

    locationPosition.attr('disabled', 'disabled').text('Sending...')
    navigator.geolocation.getCurrentPosition((poistion) => {
        locationPosition.removeAttr('disabled').text('Location')
        socket.emit('createLocationMessage', {
            longitude: poistion.coords.longitude,
            latitude: poistion.coords.latitude
        })
    }, () => {
        locationPosition.removeAttr('disabled').text('Location')
        alert('Unable to fetch location')
    })
})