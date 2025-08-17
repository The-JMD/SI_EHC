const TrainingCourse = require('../models/TrainingCourse.js')
const TrainingSession = require('../models/TrainingSession.js')
const Participant = require('../models/Participant.js')
const User = require('../models/User.js')
const Company = require('../models/Company.js')
const { Op } = require('sequelize')

class TrainingService {
  // Course methods
  async getAllCourses(filters = {}) {
    const { page = 1, limit = 10, category, type, level, search } = filters
    
    const whereClause = { isActive: true }
    
    if (category) whereClause.category = category
    if (type) whereClause.type = type
    if (level) whereClause.level = level
    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` }
    }

    return await TrainingCourse.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Company,
          as: 'provider',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'trainer',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['createdAt', 'DESC']]
    })
  }

  async getCourseById(id) {
    return await TrainingCourse.findByPk(id, {
      include: [
        {
          model: Company,
          as: 'provider',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: User,
          as: 'trainer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
        }
      ]
    })
  }

  async createCourse(courseData) {
    return await TrainingCourse.create(courseData)
  }

  async updateCourse(id, courseData) {
    const course = await TrainingCourse.findByPk(id)
    if (!course) {
      throw new Error('Formation non trouvée')
    }
    return await course.update(courseData)
  }

  async deleteCourse(id) {
    const course = await TrainingCourse.findByPk(id)
    if (!course) {
      throw new Error('Formation non trouvée')
    }
    return await course.update({ isActive: false })
  }

  // Session methods
  async getAllSessions(filters = {}) {
    const { page = 1, limit = 10, status, courseId, trainerId } = filters
    
    const whereClause = {}
    
    if (status) whereClause.status = status
    if (courseId) whereClause.courseId = courseId
    if (trainerId) whereClause.trainerId = trainerId

    return await TrainingSession.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: TrainingCourse,
          as: 'course',
          attributes: ['id', 'title', 'category', 'type']
        },
        {
          model: User,
          as: 'trainer',
          attributes: ['id', 'firstName', 'lastName', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['startDate', 'ASC']]
    })
  }

  async getSessionById(id) {
    return await TrainingSession.findByPk(id, {
      include: [
        {
          model: TrainingCourse,
          as: 'course',
          attributes: ['id', 'title', 'description', 'category', 'type', 'duration']
        },
        {
          model: User,
          as: 'trainer',
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
        },
        {
          model: Participant,
          as: 'participants',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'email']
            }
          ]
        }
      ]
    })
  }

  async createSession(sessionData) {
    return await TrainingSession.create(sessionData)
  }

  async updateSession(id, sessionData) {
    const session = await TrainingSession.findByPk(id)
    if (!session) {
      throw new Error('Session non trouvée')
    }
    return await session.update(sessionData)
  }

  async deleteSession(id) {
    const session = await TrainingSession.findByPk(id)
    if (!session) {
      throw new Error('Session non trouvée')
    }
    return await session.destroy()
  }

  // Participant methods
  async enrollParticipant(sessionId, userId, approvedBy = null) {
    // Check if session exists and has available spots
    const session = await TrainingSession.findByPk(sessionId)
    if (!session) {
      throw new Error('Session non trouvée')
    }

    if (session.currentParticipants >= session.maxParticipants) {
      throw new Error('Session complète')
    }

    // Check if user is already enrolled
    const existingEnrollment = await Participant.findOne({
      where: { sessionId, userId }
    })

    if (existingEnrollment) {
      throw new Error('Utilisateur déjà inscrit à cette session')
    }

    // Create enrollment
    const participant = await Participant.create({
      sessionId,
      userId,
      status: 'ENROLLED',
      approvedBy,
      approvalDate: approvedBy ? new Date() : null
    })

    // Update session participant count
    await session.update({
      currentParticipants: session.currentParticipants + 1
    })

    return participant
  }

  async updateParticipantStatus(participantId, status) {
    const participant = await Participant.findByPk(participantId)
    if (!participant) {
      throw new Error('Inscription non trouvée')
    }

    const updateData = { status }
    
    if (status === 'COMPLETED') {
      updateData.completionDate = new Date()
    }

    return await participant.update(updateData)
  }

  async getSessionParticipants(sessionId) {
    return await Participant.findAll({
      where: { sessionId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email', 'department']
        }
      ],
      order: [['enrollmentDate', 'ASC']]
    })
  }

  // Statistics methods
  async getTrainingStats() {
    const totalCourses = await TrainingCourse.count({ where: { isActive: true } })
    const totalSessions = await TrainingSession.count()
    const activeSessions = await TrainingSession.count({ where: { status: 'IN_PROGRESS' } })
    const completedSessions = await TrainingSession.count({ where: { status: 'COMPLETED' } })
    const totalParticipants = await Participant.count()
    const completedParticipants = await Participant.count({ where: { status: 'COMPLETED' } })

    return {
      totalCourses,
      totalSessions,
      activeSessions,
      completedSessions,
      totalParticipants,
      completedParticipants,
      completionRate: totalParticipants > 0 ? (completedParticipants / totalParticipants) * 100 : 0
    }
  }

  async getCourseStats(courseId) {
    const sessions = await TrainingSession.findAll({
      where: { courseId },
      include: [
        {
          model: Participant,
          as: 'participants'
        }
      ]
    })

    const totalSessions = sessions.length
    const totalParticipants = sessions.reduce((sum, session) => sum + session.participants.length, 0)
    const completedSessions = sessions.filter(s => s.status === 'COMPLETED').length
    const activeSessions = sessions.filter(s => s.status === 'IN_PROGRESS').length

    return {
      totalSessions,
      totalParticipants,
      completedSessions,
      activeSessions,
      completionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0
    }
  }

  // Search methods
  async searchCourses(query) {
    return await TrainingCourse.findAll({
      where: {
        isActive: true,
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { category: { [Op.like]: `%${query}%` } }
        ]
      },
      include: [
        {
          model: Company,
          as: 'provider',
          attributes: ['id', 'name']
        }
      ],
      limit: 20
    })
  }

  // Validation methods
  async validateSessionData(sessionData) {
    const errors = []

    if (!sessionData.courseId) {
      errors.push('ID du cours requis')
    }

    if (!sessionData.startDate || !sessionData.endDate) {
      errors.push('Dates de début et fin requises')
    }

    if (new Date(sessionData.startDate) >= new Date(sessionData.endDate)) {
      errors.push('La date de fin doit être postérieure à la date de début')
    }

    if (sessionData.maxParticipants && sessionData.maxParticipants < 1) {
      errors.push('Le nombre maximum de participants doit être supérieur à 0')
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    return true
  }

  async validateCourseData(courseData) {
    const errors = []

    if (!courseData.title) {
      errors.push('Titre requis')
    }

    if (!courseData.category) {
      errors.push('Catégorie requise')
    }

    if (!courseData.type) {
      errors.push('Type requis')
    }

    if (!courseData.duration || courseData.duration < 1) {
      errors.push('Durée requise et doit être supérieure à 0')
    }

    if (!courseData.price || courseData.price < 0) {
      errors.push('Prix requis et doit être positif')
    }

    if (!courseData.level) {
      errors.push('Niveau requis')
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    return true
  }
}

module.exports = new TrainingService()
