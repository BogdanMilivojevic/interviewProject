const sendError = (err, res) => {
  console.log(err)
  console.log(err.name)
  if (err.code === 11000) {
    res.status(400).json({
      status: 'fail',
      message: `The ${Object.keys(err.keyValue)}: ${Object.values(
        err.keyValue
      )} is already in use, please use another one`
    })
  } else if (err.isOperational === true) {
    res.status(err.statusCode).json({
      status: 'fail',
      message: err.message
    })
  } else if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'fail',
      message: err.message.split(':')[2]
    })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(403).json({
      status: 'fail',
      message: 'Unauthorized: jwt must be provided'
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: 'something went wrong'
    })
  }
}

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  sendError(err, res)
}
