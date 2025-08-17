const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')

// Public routes
router.post('/login', authController.login)

// Protected routes
router.get('/me', authMiddleware, authController.getCurrentUser)

module.exports = router
