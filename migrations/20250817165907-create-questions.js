'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
 * Define the Questions table with columns: id (UUID, primary key), quizId (UUID, foreign key referencing quizzes), type (string), text (text, not null), and options (JSON).
     */
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      quizId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'quizzes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      options: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */ await queryInterface.dropTable('questions');
  }
};
