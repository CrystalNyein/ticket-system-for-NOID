'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    // Remove the 'event_code' column from the 'events' table
    await queryInterface.removeColumn('events', 'code');
  },

  async down(queryInterface,Sequelize) {
    // Add the 'event_code' column back in case of a rollback
    await queryInterface.addColumn('events', 'code', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true, // If the column was unique
    });
  },
};
