/**
 * @swagger
 *  components:
 *   schemas:
 *     Blogpost:
 *      type: object
 *      properties:
 *        _id:
 *         type: ObjectId
 *         description: Blogpost's id
 *        title:
 *         type: string
 *         description: Blogpost's title
 *        author:
 *         type: string
 *         description: BLogpost's author
 *        body:
 *         type: string
 *         description: Blogpost's body
 *        date:
 *         type: Date
 *         description: Blogposts's date
 *        likes:
 *         type: integer
 *         description: Blogpost's likes
 *        importance:
 *         type: string
 *         description: Blogpost's importance
 *        createdAt:
 *         type: string
 *         description: Date and time when blogpost was created
 *        updatedAt:
 *         type: string
 *         description: Date and time when blogpost was updated
 * @swagger
 * /blogposts:
 *  post:
 *   summary: Create blogpost
 *   security:
 *     - Authorization: []
 *   tags: [Blogposts]
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Blogpost'
 *        examples:
 *         sample:
 *          value:
 *           title: Title
 *           author: Author
 *           body: Hello there everyone, how are you feeling today?
 *   responses:
 *     200:
 *      description: Blogpost created
 *      content:
 *        application/json:
 *          example:
 *           status: success
 *           message: Blogpost created
 *           blogpost:
 *            title: Title
 *            author: Author
 *            body: Hello there everyone, how are you feeling today?
 *            date: 2023-05-06T10:53:03.701Z
 *            likes: 0
 *            importance: standard
 *            id: 645631ed399cc7bd69d1accb
 *            createdAt: 2023-05-06T10:54:37.717Z
 *            updatedAt: 2023-05-06T10:54:37.717Z
 *     400:
 *      description: Missing request parameters
 *     422:
 *      description: Unprocessable entity
 *  get:
 *   summary: Get all blogposts
 *   security:
 *     - Authorization: []
 *   tags: [Blogposts]
 *   responses:
 *     200:
 *      description: BLogposts retrieved
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *            status:
 *             type: string
 *             example: success
 *            blogposts:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *                id:
 *                 type: ObjectId
 *                 example: 645631ed399cc7bd69d1accb
 *                title:
 *                 type: string
 *                 example: Title
 *                author:
 *                 type: string
 *                 example: Author
 *                body:
 *                 type: string
 *                 example: Hello there everyone, how are you feeling today?
 *                date:
 *                 type: string
 *                 example: 2023-05-06T10:53:03.701Z
 *                likes:
 *                 type: integer
 *                 example: 0
 *                importance:
 *                 type: string
 *                 example: standard
 *                createdAt:
 *                 type: string
 *                 example: 2023-05-06T10:53:03.701Z
 *                updatedAt:
 *                 type: string
 *                 example: 2023-05-06T10:53:03.701Z
 * /blogposts/{id}:
 *  patch:
 *   summary: Update user
 *   security:
 *     - Authorization: []
 *   tags: [Blogposts]
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/Blogposts'
 *        examples:
 *         sample:
 *          value:
 *           title: Title2
 *           author: Author2
 *           body: Hello there everyone, how are you feeling today on this sunny day?
 *   responses:
 *     200:
 *      description: Blogpos updated
 *      content:
 *        application/json:
 *          example:
 *           status: success
 *           message: Blogpost updated
 *           blogpost:
 *            id: 645631ed399cc7bd69d1accb
 *            title: Title2
 *            author: Author2
 *            body: Hello there everyone, how are you feeling today on this sunny day?
 *            likes: 0
 *            importance: standard
 *            createdAt: 2023-05-06T09:20:14.154Z
 *            updatedAt: 2023-05-06T10:06:15.795Z
 *     400:
 *      description: Missing request parameters
 *     422:
 *      description: Unprocessable entity
 *  delete:
 *    summary: Delete Blogpost
 *    security:
 *     - Authorization: []
 *    tags: [Blogposts]
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *    responses:
 *      204:
 *       description: Blogpost deleted
 *      403:
 *       description: JWT must be provided
 * /blogposts/like/{id}:
 *  patch:
 *   summary: Blogpost like
 *   security:
 *     - Authorization: []
 *   tags: [Blogposts]
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *   responses:
 *     200:
 *      description: Blogpost liked
 *      content:
 *        application/json:
 *          example:
 *           status: success
 *           message: Blogpost has been liked
 *           blogpost:
 *            id: 645631ed399cc7bd69d1accb
 *            title: Title2
 *            author: Author2
 *            body: Hello there everyone, how are you feeling today on this sunny day?
 *            likes: 1
 *            importance: standard
 *            createdAt: 2023-05-06T09:20:14.154Z
 *            updatedAt: 2023-05-06T10:06:15.795Z
 *     400:
 *      description: Missing request parameters
 *     422:
 *      description: Unprocessable entity
 * /blogposts/author/{author}:
 *  get:
 *   summary: Blogpost search by author
 *   security:
 *     - Authorization: []
 *   tags: [Blogposts]
 *   parameters:
 *       - in: path
 *         name: author
 *         required: true
 *   responses:
 *     200:
 *      description: Blogpost found
 *      content:
 *        application/json:
 *          example:
 *           status: success
 *           blogpost:
 *            id: 645631ed399cc7bd69d1accb
 *            title: Title
 *            author: Author
 *            body: Hello there everyone, how are you feeling today?
 *            likes: 1
 *            importance: standard
 *            createdAt: 2023-05-06T09:20:14.154Z
 *            updatedAt: 2023-05-06T10:06:15.795Z
 *     400:
 *      description: Missing request parameters
 *     422:
 *      description: Unprocessable entity
 * /blogposts/title/{title}:
 *  get:
 *   summary: Blogpost search by title
 *   security:
 *     - Authorization: []
 *   tags: [Blogposts]
 *   parameters:
 *       - in: path
 *         name: title
 *         required: true
 *   responses:
 *     200:
 *      description: Blogpost found
 *      content:
 *        application/json:
 *          example:
 *           status: success
 *           blogpost:
 *            id: 645631ed399cc7bd69d1accb
 *            title: Title
 *            author: Author
 *            body: Hello there everyone, how are you feeling today?
 *            likes: 1
 *            importance: standard
 *            createdAt: 2023-05-06T09:20:14.154Z
 *            updatedAt: 2023-05-06T10:06:15.795Z
 *     400:
 *      description: Missing request parameters
 *     422:
 *      description: Unprocessable entity
 */

import express from 'express'
import blogPostController from '../controllers/blogPostController.js'
import authentication from '../middlewares/authentication.js'
import blogPostPolicy from '../policy/restrict.js'
import validationMiddleware from '../middlewares/validation.js'
import validation from '../utils/validation.js'

const router = express.Router()

router.post('/', validationMiddleware(validation.createOrUpdateBlogpost), authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator']), blogPostController.create)
router.get('/', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator', 'guest']), blogPostController.index)

router.patch('/:id', validationMiddleware(validation.createOrUpdateBlogpost), authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator']), blogPostController.update)
router.delete('/:id', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator']), blogPostController.deleteBlogPost)
router.patch('/like/:id', authentication.authenticate, blogPostPolicy.restrict(['guest']), blogPostController.like)

router.get('/author/:author', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator', 'guest']), blogPostController.show)
router.get('/title/:title', authentication.authenticate, blogPostPolicy.restrict(['admin', 'moderator', 'guest']), blogPostController.show)

export default router
