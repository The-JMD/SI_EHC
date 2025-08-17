'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Define the 'evaluations' table.
     */
 await queryInterface.createTable('evaluations', {
 id: {
 type: Sequelize.UUID,
 defaultValue: Sequelize.UUIDV4,
 primaryKey: true,
 allowNull: false,
 },
 employeeId: {
 type: Sequelize.UUID,
 allowNull: false,
 references: {
 model: 'employees', // name of the target table
 key: 'id', // key in the target table that we're referencing
 },
 onUpdate: 'CASCADE',
 onDelete: 'SET NULL',
 },
 sessionId: {
 type: Sequelize.UUID,
 allowNull: false,
 references: {
 model: 'training_sessions', // name of the target table
 key: 'id', // key in the target table that we're referencing
 },
 onUpdate: 'CASCADE',
 onDelete: 'SET NULL',
 },
 evaluationDate: {
 type: Sequelize.DATE,
 allowNull: false,
 },
 score: {
 type: Sequelize.DECIMAL,
 allowNull: true, // Assuming score can be null initially
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
 await queryInterface.dropTable('evaluations');
  }
};
