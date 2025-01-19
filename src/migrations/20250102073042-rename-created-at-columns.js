'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    // List of tables and columns to be altered
    const tablesToAlter = [
      { tableName: 'events', columns: ['createdAt', 'updatedAt'] },
      { tableName: 'tickets', columns: ['createdAt', 'updatedAt'] },
      { tableName: 'ticket_scans', columns: ['createdAt', 'updatedAt'] },
      { tableName: 'ticket_types', columns: ['createdAt', 'updatedAt'] },
    ];

    // Iterate over each table and alter the columns
    for (const { tableName, columns } of tablesToAlter) {
      for (const column of columns) {
        await queryInterface.renameColumn(tableName, column, column === 'createdAt' ? 'created_at' : 'updated_at');
      }
    }
  },

  async down(queryInterface,Sequelize) {
    // List of tables and columns to be altered
    const tablesToAlter = [
      { tableName: 'events', columns: ['created_at', 'updated_at'] },
      { tableName: 'tickets', columns: ['created_at', 'updated_at'] },
      { tableName: 'ticket_scans', columns: ['created_at', 'updated_at'] },
      { tableName: 'ticket_types', columns: ['created_at', 'updated_at'] },
    ];

    // Iterate over each table and alter the columns
    for (const { tableName, columns } of tablesToAlter) {
      for (const column of columns) {
        await queryInterface.renameColumn(tableName, column, column === 'created_at' ? 'createdAt' : 'updatedAt');
      }
    }
  },
};
