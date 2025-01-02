'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // Remove the 'event_code' column from the 'events' table
    await queryInterface.removeColumn('events', 'code');
  },

  async down(queryInterface: QueryInterface) {
    // Add the 'event_code' column back in case of a rollback
    await queryInterface.addColumn('events', 'code', {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, // If the column was unique
    });
  },
};
