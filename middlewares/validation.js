import catchAsyncError from '../utils/catchAsyncError.js'

const validationMiddleware = (schema) => catchAsyncError(async (req, res, next) => {
  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  }
  const value = await schema.validateAsync(req.body, validationOptions)
  req.body = value
  next()
})

export default validationMiddleware
