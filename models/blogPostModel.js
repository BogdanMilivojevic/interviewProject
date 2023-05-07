import mongoose from 'mongoose'

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date(Date.now())
  },
  likes: {
    type: Number,
    default: 0
  },
  importance: {
    type: String,
    enum: ['important', 'standard'],
    default: 'standard'
  }
}, {
  timestamps: true
})

const BlogPost = mongoose.model('BlogPost', blogPostSchema)

export default BlogPost
