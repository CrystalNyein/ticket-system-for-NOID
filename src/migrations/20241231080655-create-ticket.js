'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.createTable('tickets', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ticket_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_code: {
        type: Sequelize.STRING,
        references: { model: 'events', key: 'code' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      ticket_type_code: {
        type: Sequelize.STRING,
        references: { model: 'ticket_types', key: 'type_code' },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM('available', 'sold', 'revoked', 'expired'),
        allowNull: false,
        defaultValue: 'available',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    // Add composite unique constraint on ticket_code, ticket_type_code, and event_id
    await queryInterface.addConstraint('tickets', {
      fields: ['ticket_code', 'ticket_type_code', 'event_code'],
      type: 'unique',
      name: 'unique_ticket_code_ticket_type_event',
    });
  },
  async down(queryInterface,Sequelize) {
    await queryInterface.removeConstraint('tickets', 'unique_ticket_code_ticket_type_event');
    await queryInterface.dropTable('tickets');
  },
};
