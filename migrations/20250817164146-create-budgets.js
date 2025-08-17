'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
 * Define the budgets table with columns: id (UUID, primary key), departmentId (UUID, foreign key referencing departments), year (integer), amount (decimal), and usedAmount (decimal).
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
 await queryInterface.createTable('budgets', {
      id: {
 type: Sequelize.UUID,
 defaultValue: Sequelize.UUIDV4,
 allowNull: false,
 primaryKey: true,
      },
      departmentId: {
 type: Sequelize.UUID,
 references: {
 model: 'departments',
 key: 'id',
 },
 allowNull: false,
      },
      year: {
 type: Sequelize.INTEGER,
 allowNull: false,
      },
      amount: {
 type: Sequelize.DECIMAL,
 allowNull: false,
      },
      usedAmount: {
 type: Sequelize.DECIMAL,
 defaultValue: 0,
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
 await queryInterface.dropTable('budgets');
  }
};
