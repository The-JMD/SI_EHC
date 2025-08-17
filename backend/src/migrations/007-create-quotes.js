'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prospect_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'prospects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      quote_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('quotes');
  }
};