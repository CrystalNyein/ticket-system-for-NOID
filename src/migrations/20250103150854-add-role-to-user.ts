'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('users', 'role', {
      type: DataTypes.ENUM('admin', 'event_manager', 'staff'),
      allowNull: false,
      defaultValue: 'staff',
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('users', 'role');
  },
};
