'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProspectSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProspectSource.belongsTo(models.Prospect, {
        foreignKey: 'prospect_id',
      });
      ProspectSource.belongsTo(models.MarketingCampaign, {
        foreignKey: 'campaign_id',
      });
    }
  }
  ProspectSource.init({
    source_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    prospect_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'prospects',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    campaign_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'marketing_campaigns',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    source_type: DataTypes.STRING,
    source_detail: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ProspectSource',
    tableName: 'prospect_sources',
    timestamps: false, // Assuming created_at is the only timestamp
    createdAt: 'created_at',
    updatedAt: false,
  });
  return ProspectSource;
};