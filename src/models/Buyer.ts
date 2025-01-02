import { Model, DataTypes } from 'sequelize';
import { BuyerAttributes } from '../interfaces/Buyer';
import sequelize from '../common/sequelize';
import TicketModel from './Ticket';

class BuyerModel extends Model<BuyerAttributes> {
  declare id: string;
  declare name: string;
  declare email: string | null;
  declare phone: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
}
BuyerModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9+\- ]+$/i, // Ensures the phone number contains only numbers, +, -, or spaces
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Buyer',
    tableName: 'buyers',
    timestamps: true,
    underscored: true,
  },
);
// BuyerModel.hasMany(TicketModel, {
//   foreignKey: 'buyer_id',
//   as: 'tickets',
// });
export default BuyerModel;
