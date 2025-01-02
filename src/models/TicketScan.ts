import { DataTypes, Model, Sequelize } from 'sequelize';
import { TicketScanAttributes } from '../interfaces/TicketScan';
import sequelize from '../common/sequelize';
import TicketModel from './Ticket';

class TicketScanModel extends Model<TicketScanAttributes> implements TicketScanAttributes {
  declare id: string;
  declare ticket_id: string;
  declare scan_date: Date;
  declare created_at?: Date;
  declare updated_at?: Date;
}
TicketScanModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    ticket_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'tickets', // Ensure this matches the Ticket table name
        key: 'id', // Referencing the 'id' field in the TicketModel
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    scan_date: { type: DataTypes.DATEONLY, allowNull: false },
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
    modelName: 'TicketScan',
    tableName: 'ticket_scans',
    timestamps: true,
    indexes: [{ unique: true, fields: ['ticket_id', 'scan_date'], name: 'unique_ticket_scan_per_day' }],
  },
);
// TicketScanModel.belongsTo(TicketModel, { foreignKey: 'ticket_id', as: 'ticket' });
export default TicketScanModel;
