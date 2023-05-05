import catchAsyncError from '../utils/catchAsyncError.js'
import AppError from '../utils/AppError.js'
import BlogPost from '../models/blogPostModel.js'

const create = catchAsyncError(async (req, res, next) => {
  const minimumLength = 3
  if (Object.values(req.body).length < minimumLength) return next(new AppError('Parameters are missing', 400))

  const blogPost = await BlogPost.create({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    importance: req.body.importance
  })

  res.status(201).json({
    status: 'Blogpost created',
    blogPost
  })
})

const index = catchAsyncError(async (req, res, next) => {
  const page = req.query.page || 0
  const limit = req.query.limit || 10

  const blogPosts = await BlogPost.find({}).skip(page * limit).limit(limit)

  if (blogPosts.length > 0) {
    res.status(200).json({
      status: 'success',
      blogPosts
    })
  } else {
    res.status(200).json({
      status: 'success',
      blogPosts: []
    })
  }
})

const update = catchAsyncError(async (req, res, next) => {
  const update = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body
  }

  const updatedBlogPost = await BlogPost.findOneAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    status: 'sucess',
    message: 'Title updated',
    updatedBlogPost
  })
})

const deleteBlogPost = catchAsyncError(async (req, res, next) => {
  await BlogPost.deleteOne({ _id: req.params.id })

  res.status(204).json({
    status: 'success',
    message: 'Blogpost deleted'
  })
})

const like = catchAsyncError(async (req, res, next) => {
  const likedBlogPost = await BlogPost.findOneAndUpdate(req.params.id, {
    $inc: { likes: 1 }
  }, {
    new: true,
    runValidators: true
  })
  res.status(200).json({
    status: 'success',
    message: 'Blogpost has been liked',
    likedBlogPost
  })
})

const show = catchAsyncError(async (req, res, next) => {
  const field = Object.keys(req.params)[0]
  const value = Object.values(req.params)[0]
  let blogPostQuery = ''
  if (field === 'author') {
    blogPostQuery = await BlogPost.findOne({ author: { $regex: value, $options: 'i' } })
  } else {
    blogPostQuery = await BlogPost.findOne({ title: { $regex: value, $options: 'i' } })
  }
  if (blogPostQuery) {
    res.status(200).json({
      status: 'success',
      blogPostQuery
    })
  } else {
    throw next(new AppError('No blogpost found', 404))
  }
})

export default { create, index, update, like, show, deleteBlogPost }
