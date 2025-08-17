'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
 * Define the client_history table with columns: id (UUID, primary key), companyId (UUID, foreign key referencing companies), eventType (string), eventDate (datetime), and details (text).
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
 await queryInterface.createTable('client_history', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
 onUpdate: 'CASCADE',
 onDelete: 'CASCADE',
      },
      eventType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eventDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      details: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
 * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
 await queryInterface.dropTable('client_history');
  }
};
