import express from 'express'
import authController from '../controllers/authController.js'
import authentication from '../middlewares/authentication.js'
import userPolicy from '../policy/restrict.js'
import userController from '../controllers/userController.js'
const router = express.Router()

router.post('/', authentication.authenticate, userPolicy.restrict('admin'), userController.create)
router.get('/', authentication.authenticate, userPolicy.restrict('admin'), userController.index)

router.patch('/:id', authentication.authenticate, userPolicy.restrict('admin'), userController.patch)
router.delete('/:id', authentication.authenticate, userPolicy.restrict('admin'), userController.deleteUser)

router.patch('/updatepassword/:id', authentication.authenticate, userPolicy.restrict('admin'), userController.updatePassword)

router.post('/register', authController.register)
router.post('/login', authController.login)

export default router
