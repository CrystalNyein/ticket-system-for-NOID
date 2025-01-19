import { DataTypes, Model, Sequelize } from 'sequelize';
import { TicketScanAttributes, TicketScanCreateAttributes } from '../interfaces/TicketScan';
import sequelize from '../common/sequelize';
import TicketModel from './Ticket';

class TicketScanModel extends Model<TicketScanAttributes | TicketScanCreateAttributes> {
  declare id: string;
  declare ticketId: string;
  declare scanDate: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  static filterableColumns = ['ticketId', 'scanDate'];
  static searchableColumns = [];
}
TicketScanModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ticket_id',
      references: {
        model: 'tickets', // Ensure this matches the Ticket table name
        key: 'id', // Referencing the 'id' field in the TicketModel
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    scanDate: { type: DataTypes.DATEONLY, allowNull: false, field: 'scan_date' },
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
    modelName: 'TicketScan',
    tableName: 'ticket_scans',
    timestamps: true,
    indexes: [{ unique: true, fields: ['ticketId', 'scanDate'], name: 'unique_ticket_scan_per_day' }],
    underscored: true,
  },
);
// TicketScanModel.belongsTo(TicketModel, { foreignKey: 'ticket_id', as: 'ticket' });
export default TicketScanModel;
