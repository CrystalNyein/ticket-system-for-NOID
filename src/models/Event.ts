import { DataTypes, Model } from 'sequelize';
import { EventAttributes, EventCreateAttributes } from '../interfaces/Event';
import sequelize from '../common/sequelize';
import TicketModel from './Ticket';

class EventModel extends Model<EventAttributes, EventCreateAttributes> {
  declare id: string;
  declare name: string;
  declare description: string | null;
  declare startDate: Date;
  declare endDate: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  static filterableColumns = ['startDate', 'endDate'];
  static searchableColumns = ['name', 'description'];
}
EventModel.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'start_date',
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'end_date',
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
    modelName: 'Event',
    tableName: 'events',
    timestamps: true,
    underscored: true,
  },
);
// EventModel.hasMany(TicketModel, {
//   foreignKey: 'event_id',
//   as: 'tickets',
// });
export default EventModel;
