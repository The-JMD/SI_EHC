const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware.js')

router.get('/courses', authMiddleware, (req, res) => {
  res.json({ message: 'Training courses route' })
})

router.get('/sessions', authMiddleware, (req, res) => {
  res.json({ message: 'Training sessions route' })
})

module.exports = router
