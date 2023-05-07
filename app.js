import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import mongoose from 'mongoose'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import userRoutes from './routes/userRoutes.js'
import blogPostRoutes from './routes/blogPostRoutes.js'
import globalErrorHandler from './controllers/errorController.js'

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
mongoose.connect(dbURI, {}).then(connection => {
  console.log('DB connection succesful')
})

// API docs
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Interview project',
      version: '0.1.0',
      description:
  'Blogpost and user routes',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Interviewproject',
        email: 'info@email.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${port}`
      }
    ],
    components: {
      securitySchemes: {
        Authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          value: 'Bearer <JWT token here>'
        }
      }
    }
  },
  apis: ['./routes/*.js']
}

// Routes
app.use('/users', userRoutes)
app.use('/blogposts', blogPostRoutes)
// Global error handling
app.use(globalErrorHandler)

const specs = swaggerJsdoc(options)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
)

// Start server
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
  })

  // Unhandled errors
  process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHADLED REJECTION')
    server.close(() => {
      process.exit(1)
    })
  })

  process.on('uncaughtException', err => {
    console.log(err.name, err.message)
    console.log('UNCAUGHT EXCEPTION')
    server.close(() => {
      process.exit(1)
    })
  })
}

export default app
