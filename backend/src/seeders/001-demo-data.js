'use strict'

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create demo company
    const companies = await queryInterface.bulkInsert('companies', [{
      name: 'EHC Group',
      address: '123 Business Street',
      city: 'Casablanca',
      country: 'Morocco',
      phone: '+212-5-22-123456',
      email: 'contact@ehc-group.com',
      website: 'https://ehc-group.com',
      industry: 'Technology',
      size: 'LARGE',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }], { returning: true })

    const companyId = companies[0].id

    // Create demo users
    const hashedPassword = await bcrypt.hash('password123', 12)
    
    const users = await queryInterface.bulkInsert('users', [
      {
        email: 'admin@ehc-group.com',
        password: hashedPassword,
        first_name: 'Admin',
        last_name: 'User',
        phone: '+212-6-12-345678',
        role: 'ADMIN',
        company_id: companyId,
        department: 'IT',
        position: 'System Administrator',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'rrh@ehc-group.com',
        password: hashedPassword,
        first_name: 'RRH',
        last_name: 'Manager',
        phone: '+212-6-12-345679',
        role: 'RRH',
        company_id: companyId,
        department: 'HR',
        position: 'HR Manager',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'employee@ehc-group.com',
        password: hashedPassword,
        first_name: 'John',
        last_name: 'Doe',
        phone: '+212-6-12-345680',
        role: 'EMPLOYEE',
        company_id: companyId,
        department: 'Development',
        position: 'Software Developer',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        email: 'trainer@ehc-group.com',
        password: hashedPassword,
        first_name: 'Jane',
        last_name: 'Smith',
        phone: '+212-6-12-345681',
        role: 'TRAINER',
        company_id: companyId,
        department: 'Training',
        position: 'Senior Trainer',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true })

    // Create demo training courses
    const courses = await queryInterface.bulkInsert('training_courses', [
      {
        title: 'React.js Fundamentals',
        description: 'Learn the basics of React.js development',
        category: 'Frontend Development',
        type: 'TECHNICAL',
        duration: 40,
        price: 2500.00,
        level: 'BEGINNER',
        objectives: JSON.stringify(['Understand React basics', 'Build simple components', 'Handle state management']),
        prerequisites: JSON.stringify(['Basic JavaScript knowledge', 'HTML/CSS fundamentals']),
        is_active: true,
        provider_id: companyId,
        trainer_id: users[3].id, // Jane Smith
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Project Management Agile',
        description: 'Master Agile project management methodologies',
        category: 'Project Management',
        type: 'MANAGEMENT',
        duration: 32,
        price: 3000.00,
        level: 'INTERMEDIATE',
        objectives: JSON.stringify(['Understand Agile principles', 'Lead Scrum teams', 'Manage project delivery']),
        prerequisites: JSON.stringify(['Basic project management knowledge']),
        is_active: true,
        provider_id: companyId,
        trainer_id: users[3].id,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true })

    // Create demo training sessions
    await queryInterface.bulkInsert('training_sessions', [
      {
        course_id: courses[0].id,
        start_date: new Date('2024-02-01'),
        end_date: new Date('2024-02-15'),
        location: 'EHC Training Center',
        location_type: 'PHYSICAL',
        max_participants: 15,
        current_participants: 0,
        status: 'PLANNED',
        trainer_id: users[3].id,
        price: 2500.00,
        notes: 'React.js fundamentals training session',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        course_id: courses[1].id,
        start_date: new Date('2024-02-20'),
        end_date: new Date('2024-03-05'),
        location: 'Virtual Classroom',
        location_type: 'VIRTUAL',
        max_participants: 20,
        current_participants: 0,
        status: 'PLANNED',
        trainer_id: users[3].id,
        price: 3000.00,
        notes: 'Agile project management virtual session',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])

    // Create demo budget
    await queryInterface.bulkInsert('budgets', [
      {
        year: 2024,
        total_budget: 100000.00,
        used_budget: 0.00,
        remaining_budget: 100000.00,
        currency: 'DHS',
        status: 'ACTIVE',
        notes: 'Annual training budget for 2024',
        created_by: users[1].id, // RRH Manager
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    // Remove demo data in reverse order
    await queryInterface.bulkDelete('budgets', null, {})
    await queryInterface.bulkDelete('training_sessions', null, {})
    await queryInterface.bulkDelete('training_courses', null, {})
    await queryInterface.bulkDelete('users', null, {})
    await queryInterface.bulkDelete('companies', null, {})
  }
}
