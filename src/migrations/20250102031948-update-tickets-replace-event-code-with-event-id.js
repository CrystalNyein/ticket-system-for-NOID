'use strict';

module.exports = {
  up: async (queryInterface,Sequelize) => {
    // Add the new `event_id` column
    await queryInterface.addColumn('tickets', 'event_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'events', // Ensure the `events` table exists
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    // Remove the unique constraints
    await queryInterface.removeConstraint('tickets', 'unique_ticket_code_ticket_type_event');

    // Remove the `event_code` column
    await queryInterface.removeColumn('tickets', 'event_code');

    // Add a unique constraint for `ticket_code` with `event_id` and `ticket_type_code`
    await queryInterface.addConstraint('tickets', {
      fields: ['ticket_code', 'event_id', 'ticket_type_code'],
      type: 'unique',
      name: 'unique_ticket_code_per_event_and_type',
    });
  },

  down: async (queryInterface,Sequelize) => {
    // Re-add the `event_code` column
    await queryInterface.addColumn('tickets', 'event_code', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // Remove the `event_id` column
    await queryInterface.removeColumn('tickets', 'event_id');

    // Remove the unique constraint
    await queryInterface.removeConstraint('tickets', 'unique_ticket_code_per_event_and_type');
  },
};
