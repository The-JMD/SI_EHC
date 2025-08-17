'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Define the Prospects table.
     */
    await queryInterface.createTable('prospects', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      companyId: {
        type: Sequelize.UUID,
        references: {
          model: 'companies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Or 'CASCADE' depending on your requirements
      },
      status: {
        type: Sequelize.STRING,
      },
      sourceId: {
        type: Sequelize.UUID,
        references: {
          model: 'prospect_sources', // This table will be created next
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', // Or 'CASCADE' depending on your requirements
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
     * Drop the Prospects table.
     */
    await queryInterface.dropTable('prospects');
  }
};
