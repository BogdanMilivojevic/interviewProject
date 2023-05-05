import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import blogPostRoutes from './routes/blogPostRoutes.js'
import globalErrorHandler from './controllers/errorController.js'

dotenv.config()
const app = express()

// Import ENV
const port = process.env.PORT
const frontendURL = process.env.FRONTEND_URL
const dbURL = process.env.DB_URL

// Initialise middleware
const corsOptions = {
  origin: frontendURL,
  method: '*'
}
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())

// Initialise database connection
mongoose.connect(dbURL, {}).then(connection => {
  console.log('DB connection succesful')
})
// Routes
app.use('/users', userRoutes)
app.use('/blogposts', blogPostRoutes)
// Global error handling
app.use(globalErrorHandler)
// Start server

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
  })
}

export default app
