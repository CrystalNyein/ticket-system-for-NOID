'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.addConstraint('ticket_templates', {
      fields: ['event_id', 'ticket_type_code'],
      type: 'unique',
      name: 'unique_event_id_ticket_type_code_constraint',
    });
  },

  async down(queryInterface,Sequelize) {
    await queryInterface.removeConstraint('ticket_templates', 'unique_event_id_ticket_type_code_constraint');
  },
};
