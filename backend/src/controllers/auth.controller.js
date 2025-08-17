const authService = require('../services/auth.service.js')

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email et mot de passe requis'
        })
      }

      const result = await authService.login(email, password)

      res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        data: result
      })

    } catch (error) {
      console.error('Login error:', error)
      res.status(401).json({
        success: false,
        message: error.message || 'Erreur interne du serveur'
      })
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      const userId = req.user.id
      const user = await authService.getCurrentUser(userId)

      res.status(200).json({
        success: true,
        data: { user }
      })

    } catch (error) {
      console.error('Get current user error:', error)
      res.status(404).json({
        success: false,
        message: error.message || 'Erreur interne du serveur'
      })
    }
  },

  register: async (req, res) => {
    try {
      const result = await authService.register(req.body)

      res.status(201).json({
        success: true,
        message: 'Inscription réussie',
        data: result
      })

    } catch (error) {
      console.error('Register error:', error)
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de l\'inscription'
      })
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body
      const result = await authService.forgotPassword(email)

      res.status(200).json({
        success: true,
        message: result.message
      })

    } catch (error) {
      console.error('Forgot password error:', error)
      res.status(400).json({
        success: false,
        message: error.message || 'Erreur lors de l\'envoi de l\'email'
      })
    }
  }
}

module.exports = authController
