'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
 * Define the QuoteTemplateItems table with the specified columns and constraints.
     */
 await queryInterface.createTable('quote_template_items', {
 id: {
 type: Sequelize.UUID,
 defaultValue: Sequelize.UUIDV4,
 primaryKey: true,
        },
 templateId: {
 type: Sequelize.UUID,
 references: {
 model: 'quote_templates',
 key: 'id',
          },
 onUpdate: 'CASCADE',
 onDelete: 'CASCADE',
        },
 productId: {
 type: Sequelize.UUID,
 references: {
 model: 'products',
 key: 'id',
          },
 onUpdate: 'CASCADE',
 onDelete: 'CASCADE',
        },
 quantity: {
 type: Sequelize.INTEGER,
        },
 unitPrice: {
 type: Sequelize.DECIMAL,
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
 await queryInterface.dropTable('quote_template_items');
  }
};
