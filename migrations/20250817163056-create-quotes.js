'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Quotes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      prospectId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Prospects',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Or 'CASCADE' depending on your desired behavior
      },
      quoteDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Quotes');
  },
};
