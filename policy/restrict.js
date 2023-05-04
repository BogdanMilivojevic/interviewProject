import catchAsyncError from '../utils/catchAsyncError.js'
import AppError from '../utils/AppError.js'

const restrict = (role) => catchAsyncError(async (req, res, next) => {
  if (!role.includes(req.user.role)) {
    return next(new AppError('You dont have permission', 403))
  }
  next()
})

export default { restrict }
