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

var port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server up and running on port ${port}`)
})