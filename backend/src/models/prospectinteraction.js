'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProspectInteraction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProspectInteraction.belongsTo(models.Prospect, {
        foreignKey: 'prospect_id',
        as: 'prospect',
      });
      ProspectInteraction.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }
  ProspectInteraction.init({
    interaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prospect_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'prospects',
        key: 'prospect_id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['call', 'email', 'meeting', 'demo']],
      },
    },
    subject: DataTypes.STRING,
    notes: DataTypes.TEXT,
    next_action_date: DataTypes.DATE,
    created_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'ProspectInteraction',
    tableName: 'prospect_interactions',
    timestamps: false, // Adjust if you want Sequelize to manage timestamps
    createdAt: 'created_at',
    updatedAt: false, // Assuming no updated_at for interactions
  });
  return ProspectInteraction;
};