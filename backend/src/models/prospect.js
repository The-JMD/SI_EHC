'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prospect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prospect.belongsTo(models.User, {
        foreignKey: 'assigned_to',
        as: 'assignedUser'
      });
    }
  }
  Prospect.init({
    prospect_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    industry: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('new', 'qualified', 'contacted', 'lost'),
      defaultValue: 'new'
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Prospect',
    tableName: 'prospects',
    timestamps: false // We are managing timestamps manually with created_at and updated_at
  });
  return Prospect;
};