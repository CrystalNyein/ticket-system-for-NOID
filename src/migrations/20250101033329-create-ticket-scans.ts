'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('ticket_scans', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      ticket_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'tickets',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      scan_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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

    // Ensure a ticket can only be scanned once per day
    await queryInterface.addConstraint('ticket_scans', {
      fields: ['ticket_id', 'scan_date'],
      type: 'unique',
      name: 'unique_ticket_scan_per_day',
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint('ticket_scans', 'unique_ticket_scan_per_day');
    await queryInterface.dropTable('ticket_scans');
  },
};
