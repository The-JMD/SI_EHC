'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuoteItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuoteItem.belongsTo(models.Quote, {
        foreignKey: 'quote_id',
        as: 'quote'
      });
      QuoteItem.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product'
      });
    }
  }
  QuoteItem.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quote_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quotes',
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'QuoteItem',
    tableName: 'quote_items',
    underscored: true,
    timestamps: true // Assuming you want timestamps for quote items
  });
  return QuoteItem;
};