'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const {v4:uuidv4}=require('uuid');
module.exports = {
  async up(queryInterface) {
    try {
      const users = [
        {
          id:uuidv4(),
          name: 'Admin',
          email: 'admin@noid.com',
          password: await bcrypt.hash('adminpassword', parseInt(process.env.SALT) || 10),
          role: 'admin',
          created_at:new Date(),
          updated_at:new Date()
        },
        {
          id:uuidv4(),
          name: 'Event Manager',
          email: 'eventmanager@noid.com',
          password: await bcrypt.hash('eventmanagerpassword',parseInt(process.env.SALT) || 10),
          role: 'event_manager',
          created_at:new Date(),
          updated_at:new Date()
        },
        {
          id:uuidv4(),
          name: 'Staff',
          email: 'staff@noid.com',
          password: await bcrypt.hash('staffpassword', parseInt(process.env.SALT) || 10),
          role: 'staff',
          created_at:new Date(),
          updated_at:new Date()
        },
      ];
      // Check if any users exist and insert only if not already present
      await queryInterface.bulkInsert('users', users);
      console.log('Multiple users have been added successfully!');
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  },

  async down(queryInterface) {
    // Optionally, add logic for rollback (if needed)
    await queryInterface.bulkDelete('Users', {
      role: ['admin', 'event_manager', 'staff'],
    });
  },
};
