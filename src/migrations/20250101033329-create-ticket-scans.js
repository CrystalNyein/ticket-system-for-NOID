'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.createTable('ticket_scans', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ticket_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tickets',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      scan_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
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

    // Ensure a ticket can only be scanned once per day
    await queryInterface.addConstraint('ticket_scans', {
      fields: ['ticket_id', 'scan_date'],
      type: 'unique',
      name: 'unique_ticket_scan_per_day',
    });
  },
  async down(queryInterface,Sequelize) {
    await queryInterface.removeConstraint('ticket_scans', 'unique_ticket_scan_per_day');
    await queryInterface.dropTable('ticket_scans');
  },
};
