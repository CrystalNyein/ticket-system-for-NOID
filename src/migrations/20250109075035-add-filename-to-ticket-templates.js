'use strict';

module.exports = {
  async up(queryInterface,Sequelize) {
    await queryInterface.addColumn('ticket_templates', 'filename', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface,Sequelize) {
    await queryInterface.removeColumn('ticket_templates', 'filename');
  },
};
