'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.createTable('ticket_templates', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      event_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ticket_type_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'ticket_types',
          key: 'type_code',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface,Sequelize) {
    await queryInterface.dropTable('ticket_templates');
  },
};
