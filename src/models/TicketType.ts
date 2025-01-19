import { TicketTypeAttributes, TicketTypeCreateAttributes } from '../interfaces/TicketType';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../common/sequelize';
import TicketModel from './Ticket';

class TicketTypeModel extends Model<TicketTypeAttributes, TicketTypeCreateAttributes> {
  declare id: string;
  declare typeCode: string;
  declare name: string;
  declare description: string | null;
  declare createdAt?: Date;
  declare updatedAt?: Date;
  static filterableColumns = [];
  static searchableColumns = ['name', 'description', 'typeCode'];
}
TicketTypeModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    typeCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'type_code',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'TicketType',
    tableName: 'ticket_types',
    timestamps: true,
    underscored: true,
  },
);
// TicketTypeModel.hasMany(TicketModel, { foreignKey: 'ticket_type_code', sourceKey: 'type_code', as: 'tickets' });
export default TicketTypeModel;
