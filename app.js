import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userRoutes from './routes/userRoutes.js'
import blogPostRoutes from './routes/blogPostRoutes.js'
import globalErrorHandler from './controllers/errorController.js'
import connectDb from './utils/db.js'
import swaggerOptions from './utils/swaggerOptions.js'

dotenv.config()
const app = express()

// Import ENV
const port = process.env.PORT
const frontendURL = process.env.FRONTEND_URL
const dbURI = process.env.DB_URI

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
connectDb(dbURI)

// Routes
app.use('/users', userRoutes)
app.use('/blogposts', blogPostRoutes)

// Global error handling
app.use(globalErrorHandler)

const specs = swaggerJsdoc(swaggerOptions)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
)

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
  })

  // Unhandled errors
  process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHADLED REJECTION')
  })

  process.on('uncaughtException', err => {
    console.log(err.name, err.message)
    console.log('UNCAUGHT EXCEPTION')
  })
}

export default app
