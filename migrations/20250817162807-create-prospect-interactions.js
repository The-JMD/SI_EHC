'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Define the prospect_interactions table.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('prospect_interactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      prospectId: {
        type: Sequelize.UUID,
        references: {
          model: 'prospects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      interactionDate: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Revert the table creation.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('prospect_interactions');
  }
};
