// catch error

exports.catchErrors = (fn) => {
    return (req, res, next)=>{
        fn(req, res, next).catch(err => {
            if(typeof err === 'string'){
                res.status(400).json({
                    message: err
                })
            }else {
                next(err)
            }
        })
    }
}

//  mongoDB validation error

exports.mongooseError = (err, req, res, next)=> {
    if(!err.errors) return next(err)
    const errorKeys = Object.keys(err.errors)

    let message = ""
    errorKeys.forEach( key => (message += err.errors[key].message + ", "))

    message = message.substr(0, message.length -2)

    res.status(400).json({
        message
    })
}

// development error

exports.developmentError = (err, req, res, next) => {
    err.stack = err.stack || ""
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
    }
}

// production error handler

exports.productionError = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: 'Internet server Error'
    })
}

// 404 for found

exports.notFound = (req, res, next) => {
    res.status(404).json({
        message: 'Page not found'
    })
}