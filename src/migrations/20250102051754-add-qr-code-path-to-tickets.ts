import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('tickets', 'qr_code_path', {
      type: DataTypes.STRING,
      allowNull: true, // Allowing null because it might be optional for some tickets
      defaultValue: null, // Default value is null
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('tickets', 'qr_code_path');
  },
};
