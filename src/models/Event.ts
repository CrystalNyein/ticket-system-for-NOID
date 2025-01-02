import { DataTypes, Model } from 'sequelize';
import { EventAttributes, EventCreateAttributes } from '../interfaces/Event';
import sequelize from '../common/sequelize';
import TicketModel from './Ticket';

class EventModel extends Model<EventAttributes, EventCreateAttributes> {
  declare id: string;
  declare name: string;
  declare description: string | null;
  declare start_date: Date;
  declare end_date: Date;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;
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
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
