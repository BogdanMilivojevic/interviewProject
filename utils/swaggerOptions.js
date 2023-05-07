
const port = process.env.PORT
export default {
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
