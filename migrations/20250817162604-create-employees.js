'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 await queryInterface.createTable('employees', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users', // name of the target table
          key: 'id', // key in the target table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'companies', // name of the target table
          key: 'id', // key in the target table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      departmentId: {
        type: Sequelize.UUID,
        references: {
          model: 'departments', // name of the target table
          key: 'id', // key in the target table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      jobTitleId: {
        type: Sequelize.UUID,
        references: {
          model: 'job_titles', // name of the target table
          key: 'id', // key in the target table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
     * Example:npx sequelize-cli migration:create --name create-users-table
     * await queryInterface.dropTable('employees');
     */
    await queryInterface.dropTable('employees');
  }
};
