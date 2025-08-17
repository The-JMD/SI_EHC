'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Quote.belongsTo(models.Prospect, {
        foreignKey: 'prospect_id',
        as: 'prospect'
      });
    }
  }
  Quote.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    prospect_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'prospects',
        key: 'id'
      }
    },
    quote_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Quote',
    tableName: 'quotes',
    timestamps: false, // We are manually managing created_at and updated_at
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Quote;
};