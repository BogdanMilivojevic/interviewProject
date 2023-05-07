/**
 * @swagger
 *  components:
 *   schemas:
 *     User:
 *      type: object
 *      required:
 *       - username
 *       - email
 *      properties:
 *        _id:
 *         type: ObjectId
 *         description: User's id
 *        name:
 *         type: string
 *         description: User's username
 *        lastName:
 *         type: string
 *         description: User's lastname
 *        username:
 *         type: string
 *         description: User's username
 *        password:
 *         type: string
 *         description: User's password
 *        email:
 *         type: string
 *         description: User's email
 *        role:
 *         type: string
 *         description: User's role
 *        createdAt:
 *         type: string
 *         description: Date and time when user's profile was created
 *        updatedAt:
 *         type: string
 *         description: Date and time when user's profile was updated
 * @swagger
 *  /users/register:
 *   post:
 *    summary: Creating new user
 *    tags: [Users]
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
 *        examples:
 *         sample:
 *          value:
 *           name: TestUser
 *           lastName: TestUser
 *           username: testuser
 *           password: "123456"
 *           email: testuser@test.com
 *           role: admin
 *    responses:
 *     200:
 *      description: User registered
 *      content:
 *        application/json:
 *          example:
 *           status: success
 *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     400:
 *      description: Missing request parameters
 *     422:
 *      description: Unprocessable entity
 * /users/login:
 *  post:
 *   summary: User login
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *       examples:
 *        sample:
 *         value:
 *          email: testuser@test.com
 *          password: "123456"
 *   responses:
 *     200:
 *      description: Login successful
 *      content:
 *        application/json:
 *         example:
 *           status: success
 *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     400:
 *      description: Missing request parameters
 *     401:
 *      description: Incorrect email or password
 * /users:
 *  post:
 *   summary: Create user
 *   security:
 *     - Authorization: []
 *   tags: [Users]
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
 *        examples:
 *         sample:
 *          value:
 *           name: TestUser
 *           lastName: TestUser
 *           username: testuser1
 *           password: "123456"
 *           email: testuser1@test.com
 *           role: moderator
 *   responses:
 *     200:
 *      description: User created
 *      content:
 *        application/json:
 *          example:
 *           status: success
 *           message: User created
 *     400:
 *      description: Missing request parameters
 *     422:
 *      description: Unprocessable entity
 *  get:
 *   summary: Get all users
 *   security:
 *     - Authorization: []
 *   tags: [Users]
 *   responses:
 *     200:
 *      description: Users retrieved
 *      content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *            status:
 *             type: string
 *             example: success
 *            users:
 *             type: array
 *             items:
 *              type: object
 *              properties:
 *               id:
 *                type: ObjectId
 *                example: 64561bce8107d19c63e059bf
 *               name:
 *                type: string
 *                example: TestUser
 *               lastName:
 *                type: string
 *                example: TestUser
 *               username:
 *                type: string
 *                example: testuser
 *               email:
 *                type: string
 *                example: testuser@test.com
 *               role:
 *                type: string
 *                example: admin
 *               createdAt:
 *                type: string
 *                example: 2023-05-06T09:20:14.154Z
 *               updatedAt:
 *                type: string
 *                example: 2023-05-06T09:20:14.154Z
 * /users/{id}:
 *  patch:
 *   summary: Update user
 *   security:
 *     - Authorization: []
 *   tags: [Users]
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
 *        examples:
 *         sample:
 *          value:
 *           name: TestUser
 *           lastName: TestUser
 *           username: testuser2
 *           email: testuser2@test.com
 *           role: moderator
 *   responses:
 *     200:
 *      description: User updated
 *      content:
 *        application/json:
 *          example:
 *           status: success
 *           message: User updated
 *           user:
 *            id: 64561be08107d19c63e059c2
 *            name: TestUser
 *            lastName: TestUser
 *            username: testuser2
 *            email: testuser2@test.com
 *            role: moderator
 *            createdAt: 2023-05-06T09:20:14.154Z
 *            updatedAt: 2023-05-06T10:06:15.795Z
 *     400:
 *      description: Missing request parameters
 *     422:
 *      description: Unprocessable entity
 *  delete:
 *    summary: Delete User
 *    security:
 *     - Authorization: []
 *    tags: [Users]
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *    responses:
 *      204:
 *       description: User deleted
 *      403:
 *       description: JWT must be provided
 * /users/updatepassword/{id}:
 *  patch:
 *   summary: Update password
 *   security:
 *     - Authorization: []
 *   tags: [Users]
 *   parameters:
 *       - in: path
 *         name: id
 *         required: true
 *   requestBody:
 *     required: true
 *     content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'
 *        examples:
 *         sample:
 *          value:
 *           password: 12345678
 *   responses:
 *     200:
 *      description: User updated
 *      content:
 *        application/json:
 *          example:
 *           status: success
 *           message: Password updated
 *     400:
 *      description: Missing request parameters
 *     422:
 *      description: Unprocessable entity
 *
 */

import express from 'express'
import authController from '../controllers/authController.js'
import authentication from '../middlewares/authentication.js'
import userPolicy from '../policy/restrict.js'
import userController from '../controllers/userController.js'
import validation from '../utils/validation.js'
import validationMiddleware from '../middlewares/validation.js'
const router = express.Router()

router.post('/', validationMiddleware(validation.register), authentication.authenticate, userPolicy.restrict('admin'), userController.create)
router.get('/', authentication.authenticate, userPolicy.restrict('admin'), userController.index)

router.patch('/:id', validationMiddleware(validation.updateUser), authentication.authenticate, userPolicy.restrict('admin'), userController.patch)
router.delete('/:id', authentication.authenticate, userPolicy.restrict('admin'), userController.deleteUser)

router.patch('/updatepassword/:id', validationMiddleware(validation.updatePassword), authentication.authenticate, userPolicy.restrict('admin'), userController.updatePassword)

router.post('/register', validationMiddleware(validation.register), authController.register)
router.post('/login', validationMiddleware(validation.login), authController.login)

export default router
