const errorHandler = (err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || 'Internal Server Error'
    
    console.log(err);
    
    if (err.name == 'SequelizeValidationError') {
        let msg = []

        err.errors.forEach(el => {
            msg.push(el.message)
        });

        res.status(400).json({
            status: 400,
            message: msg.join(', ')
        })
    } else {
        res.status(status).json({
            status: status,
            message: message
        })
    }
}

module.exports = errorHandler