'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('admin', 'event_manager', 'staff'),
      allowNull: false,
      defaultValue: 'staff',
    });
  },

  async down(queryInterface,Sequelize) {
    await queryInterface.removeColumn('users', 'role');
  },
};
