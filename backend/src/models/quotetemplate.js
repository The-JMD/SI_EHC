'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuoteTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuoteTemplate.hasMany(models.QuoteTemplateItem, {
        foreignKey: 'template_id',
        as: 'items'
      });
    }
  }
  QuoteTemplate.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'QuoteTemplate',
    tableName: 'quote_templates',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return QuoteTemplate;
};