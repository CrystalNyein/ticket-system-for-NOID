module.exports= {
  up: async (queryInterface,Sequelize) => {
    await queryInterface.addColumn('tickets', 'qr_code_path', {
      type: Sequelize.STRING,
      allowNull: true, // Allowing null because it might be optional for some tickets
      defaultValue: null, // Default value is null
    });
  },

  down: async (queryInterface,Sequelize) => {
    await queryInterface.removeColumn('tickets', 'qr_code_path');
  },
};
