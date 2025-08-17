const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User.js')

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('Email ou mot de passe incorrect')
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      throw new Error('Email ou mot de passe incorrect')
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        department: user.department,
        position: user.position,
        role: user.role
      },
      token
    }
  }

  async register(userData) {
    const { email, password, firstName, lastName, phone, role } = userData

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      role: role || 'EMPLOYEE'
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role
      }
    }
  }

  async getCurrentUser(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    })

    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    return user
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    const isPasswordValid = await user.comparePassword(oldPassword)
    if (!isPasswordValid) {
      throw new Error('Ancien mot de passe incorrect')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await user.update({ password: hashedPassword })

    return { message: 'Mot de passe modifié avec succès' }
  }

  async forgotPassword(email) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('Aucun utilisateur trouvé avec cet email')
    }

    // TODO: Implement email sending logic
    // For now, just return success
    return { message: 'Email de réinitialisation envoyé' }
  }

  async resetPassword(token, newPassword) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
      const user = await User.findByPk(decoded.id)
      
      if (!user) {
        throw new Error('Utilisateur non trouvé')
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      await user.update({ password: hashedPassword })

      return { message: 'Mot de passe réinitialisé avec succès' }
    } catch (error) {
      throw new Error('Token invalide ou expiré')
    }
  }

  async updateProfile(userId, profileData) {
    const user = await User.findByPk(userId)
    if (!user) {
      throw new Error('Utilisateur non trouvé')
    }

    const allowedFields = ['firstName', 'lastName', 'phone', 'department', 'position']
    const updateData = {}
    
    allowedFields.forEach(field => {
      if (profileData[field] !== undefined) {
        updateData[field] = profileData[field]
      }
    })

    await user.update(updateData)

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        department: user.department,
        position: user.position,
        role: user.role
      }
    }
  }
}

module.exports = new AuthService()
