import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { promisify } from 'util'
import AppError from './AppError.js'

const verifyToken = async function (token, jwtSecret) {
  const verified = await promisify(jwt.verify)(token, jwtSecret)

  const user = await User.findById(verified.id)

  if (!user) return new AppError('No user found', 401)

  return user
}

export default verifyToken
