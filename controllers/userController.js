import catchAsyncError from '../utils/catchAsyncError.js'
import AppError from '../utils/AppError.js'
import User from '../models/userModel.js'

const create = catchAsyncError(async (req, res, next) => {
  const minimumLength = 5
  if (Object.values(req.body).length < minimumLength) return next(new AppError('Parameters are missing', 400))
  await User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: req.body.role
  })

  res.status(201).json({
    status: 'success',
    message: 'User created'
  })
})

const index = catchAsyncError(async (req, res, next) => {
  const page = req.query.page || 0
  const limit = req.query.limit || 10
  const users = await User.find({}).skip(page * limit).limit(limit)

  if (users.length > 0) {
    res.status(200).json({
      status: 'success',
      users
    })
  } else {
    res.status(200).json({
      status: 'success',
      users: []
    })
  }
})

const patch = catchAsyncError(async (req, res, next) => {
  const update = {
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    role: req.body.role
  }

  const updatedUser = await User.findOneAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'success',
    message: 'User updated',
    updatedUser
  })
})

const deleteUser = catchAsyncError(async (req, res, next) => {
  await User.deleteOne({ _id: req.params.id })

  res.status(204).json({
    status: 'success',
    message: 'User deleted'
  })
})

const updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  user.password = req.body.password
  await user.save()

  res.status(200).json({
    status: 'success',
    message: 'Password updated'
  })
})

export default { create, index, patch, deleteUser, updatePassword }
