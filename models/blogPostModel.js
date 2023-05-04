import mongoose from 'mongoose'

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [4, 'Title must have at least 6 characters']
  },
  author: {
    type: String,
    required: true,
    minlength: [4, 'Author must have at least 6 characters']
  },
  body: {
    type: String,
    required: true,
    minlength: [20, 'Body must have at least 6 characters']
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
