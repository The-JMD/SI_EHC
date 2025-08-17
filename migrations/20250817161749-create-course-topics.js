'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('course_topics', {
      courseId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'training_courses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      topicId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'training_topics',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
    await queryInterface.addConstraint('course_topics', {
      fields: ['courseId', 'topicId'],
      type: 'primary key',
      name: 'course_topics_pkey'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('course_topics');
  }
};
