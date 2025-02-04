'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('events', 'is_random', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default to false for backward compatibility
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('events', 'is_random');
  },
};
