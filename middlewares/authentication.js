import catchAsyncError from '../utils/catchAsyncError.js'
import verifyToken from '../utils/helpers.js'

const authenticate = catchAsyncError(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  const currentUser = await verifyToken(token, process.env.JWT_SECRET)

  req.user = currentUser
  next()
})

export default { authenticate }
