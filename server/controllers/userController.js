// const mongoose = require('mongoose')
const User = require('../models/User')
const sh256 = require('js-sha256')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const {name, email, password} = req.body

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!emailRegex.test(email)) throw "incorrect email format"
    if(password.length < 6) throw "Password must be 6 characters or more"

    const userCheck = await User.findOne({
        email,
    }) 

    if(userCheck) throw "User already registered"

    const user = new User({
        name, 
        email, 
        password: sh256(password + process.env.SALT)
    })
    await user.save()

    res.json({
        message: `User ${name} registered sucessfully!`
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        email,
        password: sh256(password + process.env.SALT),
    })

    console.log(user)
    if(!user) throw "Email or password incorrect"

    const token = await jwt.sign({id: user.id}, process.env.SALT)
    console.log(token)
    res.json({
        message: 'User has logged in successfully',
        token,
    })
}