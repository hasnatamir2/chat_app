const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname + '/../public')
var port = process.env.PORT || 3000
var app  = express()

app.use(express.static(publicPath))

app.listen(3000, () => {
    console.log(`Server is up at Port ${port}`)
})