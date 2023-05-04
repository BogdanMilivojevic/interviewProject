import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail.js'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [4, 'Username must have at least 4 characters']
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must have at least 6 characters'],
    select: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'email is invalid']
  },
  role: {
    type: String,
    enum: ['admin', 'moderator', 'guest'],
    default: 'guest'
  }
}, {
  timestamps: true
})

// Password encryption
userSchema.pre('save', async function (next) {
  console.log('here')
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)

  next()
})

// Check password
userSchema.methods.checkPassword = async function (loginPassword, dbPassword) {
  return await bcrypt.compare(loginPassword, dbPassword)
}

const User = mongoose.model('User', userSchema)

export default User
