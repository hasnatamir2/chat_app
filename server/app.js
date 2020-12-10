const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/user', require('./routes/user'))
app.use('/chatroom', require('./routes/chatRoom'))

// Setup Error handlers
const errorHandlers = require('./handlers/errorHandler')
app.use(errorHandlers.mongooseError)
app.use(errorHandlers.notFound)
if(process.env.ENV == 'DEVELOPMENT'){
    app.use(errorHandlers.developmentError)
}else{
    app.use(errorHandlers.productionError)
}

module.exports = app