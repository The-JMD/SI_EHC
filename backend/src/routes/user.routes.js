const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware.js')

router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Users route' })
})

module.exports = router
