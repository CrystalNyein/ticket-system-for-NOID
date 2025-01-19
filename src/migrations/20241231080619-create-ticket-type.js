'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.createTable('ticket_types', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type_code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Since ticket types are constant
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
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

    // No need for event_id reference here since ticket types are constant
  },
  async down(queryInterface,Sequelize) {
    await queryInterface.dropTable('ticket_types');
  },
};
