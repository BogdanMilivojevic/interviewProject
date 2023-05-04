import catchAsyncError from '../utils/catchAsyncError.js'
import AppError from '../utils/AppError.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const sendToken = (user, statusCode, response) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
  response.status(statusCode).json({
    status: 'success',
    token
  })
}

const register = catchAsyncError(async (req, res, next) => {
  if (Object.values(req.body).length < 6) return next(new AppError('Parameters are missing', 400))

  const user = await User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
  })
  sendToken(user, 201, res)
})

const login = catchAsyncError(async (req, res, next) => {
  if (Object.values(req.body).length < 2) return next(new AppError('Parameters are missing', 400))

  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email }).select('+password')

  if (!user) return next(new AppError('No user found with that email', 404))
  if (!(await user.checkPassword(password, user.password))) {
    return next(new AppError('Wrong email or password, please try again', 401))
  }

  sendToken(user, 200, res)
})
export default { login, register }
