import { DataTypes, Model } from 'sequelize';
import { TicketAttributes, TicketCreateAttributes } from '../interfaces/Ticket';
import sequelize from '../common/sequelize';
import BuyerModel from './Buyer';
import TicketTypeModel from './TicketType';
import EventModel from './Event';

class TicketModel extends Model<TicketAttributes, TicketCreateAttributes> {
  declare id: string;
  declare ticket_code: string;
  declare event_id: string;
  declare ticket_type_code: string;
  declare status: 'available' | 'sold' | 'revoked' | 'expired';
  declare buyer_id: string;
  declare readonly created_at: Date;
  declare readonly updated_at: Date;

  static filterableColumns = ['status'];
  static searchableColumns = ['ticket_code'];
}
TicketModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ticket_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'events',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    ticket_type_code: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'ticket_types',
        key: 'type_code',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('available', 'sold', 'revoked', 'expired'),
      allowNull: false,
      defaultValue: 'available',
    },
    buyer_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'buyers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    qr_code_path: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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
    modelName: 'Ticket',
    tableName: 'tickets',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['ticket_code', 'ticket_type_code', 'event_id'],
        name: 'unique_ticket_code_per_event_and_type',
      },
    ],
  },
);
// // Ticket belongs to Event
// TicketModel.belongsTo(EventModel, {
//   foreignKey: 'event_id',
//   as: 'event',
// });

// // Ticket belongs to TicketType via ticket_type_code (foreign key)
// TicketModel.belongsTo(TicketTypeModel, {
//   foreignKey: 'ticket_type_code',
//   targetKey: 'type_code',
//   as: 'ticket_type',
// });

// // Association: One Buyer can have many Tickets
// TicketModel.belongsTo(BuyerModel, {
//   foreignKey: 'buyer_id',
//   as: 'buyer',
// });

export default TicketModel;
