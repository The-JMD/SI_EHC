'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuoteTemplateItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuoteTemplateItem.belongsTo(models.QuoteTemplate, {
        foreignKey: 'template_id',
      });
      QuoteTemplateItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
      });
    }
  }
  QuoteTemplateItem.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    template_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quote_templates',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    default_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'QuoteTemplateItem',
    tableName: 'quote_template_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return QuoteTemplateItem;
};