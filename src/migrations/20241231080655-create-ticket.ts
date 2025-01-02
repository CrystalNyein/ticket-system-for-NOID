'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('tickets', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      ticket_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_code: {
        type: DataTypes.STRING,
        references: { model: 'events', key: 'code' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      ticket_type_code: {
        type: DataTypes.STRING,
        references: { model: 'ticket_types', key: 'type_code' },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: DataTypes.ENUM('available', 'sold', 'revoked', 'expired'),
        allowNull: false,
        defaultValue: 'available',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });

    // Add composite unique constraint on ticket_code, ticket_type_code, and event_id
    await queryInterface.addConstraint('tickets', {
      fields: ['ticket_code', 'ticket_type_code', 'event_code'],
      type: 'unique',
      name: 'unique_ticket_code_ticket_type_event',
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint('tickets', 'unique_ticket_code_ticket_type_event');
    await queryInterface.dropTable('tickets');
  },
};
