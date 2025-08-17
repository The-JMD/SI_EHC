'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
 * Define the marketing_campaigns table with columns: id (UUID, primary key), name (string, not null), description (text), startDate (datetime), and endDate (datetime).
     */
 await queryInterface.createTable('marketing_campaigns', {
 id: {
 type: Sequelize.UUID,
 primaryKey: true,
 defaultValue: Sequelize.UUIDV4,
 },
 name: {
 type: Sequelize.STRING,
 allowNull: false,
 },
 description: {
 type: Sequelize.TEXT,
 },
 startDate: {
 type: Sequelize.DATE,
 },
 endDate: {
 type: Sequelize.DATE,
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
 await queryInterface.dropTable('marketing_campaigns');
  }
};
