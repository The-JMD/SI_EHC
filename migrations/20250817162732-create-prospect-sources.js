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
 await queryInterface.createTable('prospect_sources', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
 await queryInterface.dropTable('prospect_sources');
  }
};
