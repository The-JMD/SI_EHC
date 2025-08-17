const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'authentification requis'
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non trouvé'
      })
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Compte désactivé'
      })
    }

    req.user = user
    next()

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalide'
      })
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expiré'
      })
    }

    console.error('Auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    })
  }
}

module.exports = authMiddleware
