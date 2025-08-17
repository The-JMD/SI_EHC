const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database.js')

const TrainingCourse = sequelize.define('TrainingCourse', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('TECHNICAL', 'MANAGEMENT', 'SOFT_SKILLS', 'CERTIFICATION', 'LANGUAGE'),
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER, // in hours
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'DHS'
  },
  level: {
    type: DataTypes.ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'),
    allowNull: false
  },
  objectives: {
    type: DataTypes.JSON,
    allowNull: true
  },
  prerequisites: {
    type: DataTypes.JSON,
    allowNull: true
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true
  },
  materials: {
    type: DataTypes.JSON,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  minParticipants: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  providerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  trainerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'training_courses'
})

module.exports = TrainingCourse
