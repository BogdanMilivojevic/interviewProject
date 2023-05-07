import Joi from 'joi'

const register = Joi.object({
  name: Joi.string().min(5),
  lastName: Joi.string().min(5),
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'moderator', 'guest')
})

const login = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required()
})

const updateUser = Joi.object({
  name: Joi.string().min(5),
  lastName: Joi.string().min(5),
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'moderator', 'guest')
})

const updatePassword = Joi.object({
  password: Joi.string().min(6).required()
})

const createOrUpdateBlogpost = Joi.object({
  title: Joi.string().min(5).required(),
  author: Joi.string().min(5).required(),
  body: Joi.string().min(20).required(),
  importance: Joi.string().valid('important', 'standard')
})

export default { register, createOrUpdateBlogpost, login, updateUser, updatePassword }
