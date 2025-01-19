module.exports = {
  async up(queryInterface,Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('tickets', 'buyer_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: {
        model: 'buyers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface,Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Remove the 'buyer_id' column from 'tickets' table
    await queryInterface.removeColumn('tickets', 'buyer_id');
  },
};
