const jwt = require('jsonwebtoken')

module.exports = async (req, res, next)=>{
    try{
        // console.log(req.headers.authorization.split(" ")[1])

        if(!req.headers.authorization) throw "Forbidden!!"

        const token = req.headers.authorization.split(" ")[1]
        const payload = await jwt.verify(token, process.env.SALT)
        
        req.payload = payload
        next()
    }catch(err){
        console.err(err)
        res.status(401).json({
            message: "Forbidden!!!!"
        })
    }
}