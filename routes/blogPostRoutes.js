import express from 'express'
import blogPostController from '../controllers/blogPostController.js'
import authentication from '../middlewares/authentication.js'
import blogPostPolicy from '../policy/restrict.js'

const router = express.Router()

router.post('/', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator']), blogPostController.create)
router.get('/', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator', 'guest']), blogPostController.index)

router.patch('/:id', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator']), blogPostController.update)
router.delete('/:id', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator']), blogPostController.deleteBlogPost)
router.patch('/like/:id', authentication.authenticate, blogPostPolicy.restrict(['guest']), blogPostController.like)

router.get('/author/:author', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator', 'guest']), blogPostController.show)
router.get('/title/:title', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator', 'guest']), blogPostController.show)

export default router
