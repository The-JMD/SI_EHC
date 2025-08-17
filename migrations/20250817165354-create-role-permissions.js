'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Define the role_permissions table.
     */
    await queryInterface.createTable('role_permissions', {
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permissionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'permissions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    // Add the composite primary key
    await queryInterface.addConstraint('role_permissions', {
      fields: ['roleId', 'permissionId'],
      type: 'primary key',
      name: 'role_permissions_pkey' // Optional: specify a name for the primary key constraint
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Drop the role_permissions table.
     */
    await queryInterface.dropTable('role_permissions');
  }
};
