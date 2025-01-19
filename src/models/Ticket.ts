import { DataTypes, Model } from 'sequelize';
import { TicketAttributes, TicketCreateAttributes } from '../interfaces/Ticket';
import sequelize from '../common/sequelize';
import BuyerModel from './Buyer';
import TicketTypeModel from './TicketType';
import EventModel from './Event';

class TicketModel extends Model<TicketAttributes, TicketCreateAttributes> {
  declare id: string;
  declare ticketCode: string;
  declare eventId: string;
  declare ticketTypeCode: string;
  declare status: 'available' | 'sold' | 'revoked' | 'expired';
  declare buyerId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  static filterableColumns = ['status'];
  static searchableColumns = ['ticketCode'];
}
TicketModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ticketCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ticket_code',
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'event_id',
      references: {
        model: 'events',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    ticketTypeCode: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ticket_type_code',
      references: {
        model: 'ticket_types',
        key: 'typeCode',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('available', 'sold', 'revoked', 'expired'),
      allowNull: false,
      defaultValue: 'available',
    },
    buyerId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'buyer_id',
      references: {
        model: 'buyers',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    qrCodePath: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
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
    modelName: 'Ticket',
    tableName: 'tickets',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['ticketCode', 'ticketTypeCode', 'eventId'],
        name: 'unique_ticket_code_per_event_and_type',
      },
    ],
    underscored: true,
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
