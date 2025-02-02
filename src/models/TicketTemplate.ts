import { DataTypes, Model } from 'sequelize';
import { TicketTemplateAttributes, TicketTemplateCreateAttributes } from '../interfaces/TicketTemplate';
import sequelize from '../common/sequelize';
import path from 'path';
import fs from 'fs';

class TicketTemplateModel extends Model<TicketTemplateAttributes, TicketTemplateCreateAttributes> {
  declare id: string;
  declare eventId: string;
  declare ticketTypeCode: string;
  declare path: string;
  declare filename: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  static filterableColumns = [];
  static searchableColumns = [];
}
TicketTemplateModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
        key: 'type_code',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'TicketTemplate',
    tableName: 'ticket_templates',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['eventId', 'ticketTypeCode'],
        name: 'unique_event_id_ticket_type_code_constraint',
      },
    ],
  },
);
// TicketTemplateModel.hasMany(TicketModel, {
//   foreignKey: 'event_id',
//   as: 'tickets',
// });

// Hook to delete file before template is removed from DB
TicketTemplateModel.beforeDestroy(async (ticketTemplate) => {
  try {
    const filePath = path.join(__dirname, '../../', ticketTemplate.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
      console.log(`Deleted template: ${filePath}`);
    }
  } catch (error) {
    console.error('Error deleting template file:', error);
  }
});
export default TicketTemplateModel;
