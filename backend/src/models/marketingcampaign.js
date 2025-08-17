'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketingCampaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MarketingCampaign.hasMany(models.ProspectSource, {
        foreignKey: 'campaign_id',
        as: 'prospectSources'
      });
    }
  }
  MarketingCampaign.init({
    campaign_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'MarketingCampaign',
    tableName: 'marketing_campaigns',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return MarketingCampaign;
};