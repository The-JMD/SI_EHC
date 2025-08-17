'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.QuoteItem, {
        foreignKey: 'product_id',
        as: 'quoteItems'
      });
      Product.hasMany(models.Subscription, {
        foreignKey: 'product_id',
        as: 'subscriptions'
      });
    }
  }
  Product.init({
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
    },
    category: {
      type: DataTypes.STRING
    },
    price_model: {
      type: DataTypes.STRING // e.g., 'per_user', 'flat_fee', 'per_session'
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
    modelName: 'Product',
    tableName: 'products',
    timestamps: false, // We handle created_at and updated_at manually
    underscored: true
  });
  return Product;
};