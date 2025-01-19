'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('ticket_templates', 'filename', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('ticket_templates', 'filename');
  },
};
