'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Define the training_categories table.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
 await queryInterface.createTable('training_categories', {
      id: {
 type: Sequelize.UUID,
 defaultValue: Sequelize.UUIDV4,
 allowNull: false,
 primaryKey: true,
      },
      name: {
 type: Sequelize.STRING,
 allowNull: false,
      },
      description: {
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
     */
 await queryInterface.dropTable('training_categories');
  }
};
