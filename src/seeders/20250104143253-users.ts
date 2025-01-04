'use strict';

import { QueryInterface } from 'sequelize';
import { UserModel } from '../models';
import env from '../config/env';
import bcrypt from 'bcrypt';
import { UserCreateAttributes } from '../interfaces/User';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    try {
      const users: UserCreateAttributes[] = [
        {
          name: 'Admin',
          email: 'admin@noid.com',
          password: await bcrypt.hash('adminpassword', env.salt),
          role: 'admin',
        },
        {
          name: 'Event Manager',
          email: 'eventmanager@noid.com',
          password: await bcrypt.hash('eventmanagerpassword', env.salt),
          role: 'event_manager',
        },
        {
          name: 'Staff',
          email: 'staff@noid.com',
          password: await bcrypt.hash('staffpassword', env.salt),
          role: 'staff',
        },
      ];
      // Check if any users exist and insert only if not already present
      await UserModel.bulkCreate(users, {
        ignoreDuplicates: true,
      });
      console.log('Multiple users have been added successfully!');
    } catch (error) {
      console.error('Error seeding users:', error);
    }
  },

  async down(queryInterface: QueryInterface) {
    // Optionally, add logic for rollback (if needed)
    await queryInterface.bulkDelete('Users', {
      role: ['admin', 'event_manager', 'staff'],
    });
  },
};
