import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  email: {
    type: String,
    required: true,
    unique: true
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
