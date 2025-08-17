'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
 * Define the prospect_contacts table with columns: id (UUID, primary key), prospectId (UUID, foreign key referencing prospects), name (string, not null), email (string), and phone (string).
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
 await queryInterface.createTable('prospect_contacts', {
 id: {
 type: Sequelize.UUID,
 defaultValue: Sequelize.UUIDV4,
 primaryKey: true,
 },
 prospectId: {
 type: Sequelize.UUID,
 references: {
 model: 'prospects',
 key: 'id',
 },
 onDelete: 'CASCADE',
 },
 name: {
 type: Sequelize.STRING,
 allowNull: false,
 },
 email: {
 type: Sequelize.STRING,
 },
 phone: {
 type: Sequelize.STRING,
 },
 });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('prospect_contacts');
  }
};
