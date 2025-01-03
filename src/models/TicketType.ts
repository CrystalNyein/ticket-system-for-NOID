import { TicketTypeAttributes, TicketTypeCreateAttributes } from '../interfaces/TicketType';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../common/sequelize';
import TicketModel from './Ticket';

class TicketTypeModel extends Model<TicketTypeAttributes, TicketTypeCreateAttributes> {
  declare id: string;
  declare type_code: string;
  declare name: string;
  declare description: string | null;
  declare created_at?: Date;
  declare updated_at?: Date;
  static filterableColumns = [];
  static searchableColumns = ['name', 'description', 'type_code'];
}
TicketTypeModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: 'TicketType',
    tableName: 'ticket_types',
    timestamps: true,
    underscored: true,
  },
);
// TicketTypeModel.hasMany(TicketModel, { foreignKey: 'ticket_type_code', sourceKey: 'type_code', as: 'tickets' });
export default TicketTypeModel;
