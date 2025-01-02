'use strict';

import { QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Rename the table from 'Events' to 'events'
    await queryInterface.renameTable('Events', 'events');
  },

  async down(queryInterface: QueryInterface) {
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
