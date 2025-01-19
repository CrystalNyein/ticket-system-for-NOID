'use strict';

import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    // Drop the old constraint
    await queryInterface.removeConstraint('ticket_templates', 'ticket_templates_ibfk_1');

    await queryInterface.changeColumn('ticket_templates', 'event_id', {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'events', // Name of the referenced table
        key: 'id', // Key in the referenced table
      },
      onDelete: 'CASCADE', // Add CASCADE for delete
      onUpdate: 'CASCADE', // Add CASCADE for update
    });
  },

  async down(queryInterface: QueryInterface) {
    // Add back the old constraint
    await queryInterface.addConstraint('ticket_templates', {
      fields: ['event_id'],
      type: 'foreign key',
      name: 'ticket_templates_ibfk_1',
      references: {
        table: 'events',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  },
};
