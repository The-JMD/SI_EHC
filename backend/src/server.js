const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Import routes
const authRoutes = require('./routes/auth.routes.js')
const userRoutes = require('./routes/user.routes.js')
const trainingRoutes = require('./routes/training.routes.js')
const organizationRoutes = require('./routes/organization.routes.js')
const budgetRoutes = require('./routes/budget.routes.js')
const planningRoutes = require('./routes/planning.routes.js')
const participantRoutes = require('./routes/participant.routes.js')
const evaluationRoutes = require('./routes/evaluation.routes.js')
const libraryRoutes = require('./routes/library.routes.js')
const certificationRoutes = require('./routes/certification.routes.js')
const reportRoutes = require('./routes/report.routes.js')

// Import middlewares
const errorMiddleware = require('./middlewares/error.middleware.js')
const logger = require('./utils/logger.js')

// Middlewares
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  })
  next()
})

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/training', trainingRoutes)
app.use('/api/organizations', organizationRoutes)
app.use('/api/budgets', budgetRoutes)
app.use('/api/planning', planningRoutes)
app.use('/api/participants', participantRoutes)
app.use('/api/evaluations', evaluationRoutes)
app.use('/api/library', libraryRoutes)
app.use('/api/certifications', certificationRoutes)
app.use('/api/reports', reportRoutes)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl
  })
})

// Error handling middleware
app.use(errorMiddleware)

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
  console.log(`🚀 EHC Training Hub API running on http://localhost:${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  process.exit(0)
})

module.exports = app
