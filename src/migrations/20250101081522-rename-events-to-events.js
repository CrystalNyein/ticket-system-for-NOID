'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Rename the table from 'Events' to 'events'
    await queryInterface.renameTable('Events', 'events');
  },

  async down(queryInterface,Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Rollback the rename: Rename 'events' back to 'Events'
    await queryInterface.renameTable('events', 'Events');
  },
};
