import UserModel from './User';
import TicketModel from './Ticket';
import TicketTypeModel from './TicketType';
import EventModel from './Event';
import BuyerModel from './Buyer';
import TicketScanModel from './TicketScan';
import TicketTemplateModel from './TicketTemplate';

UserModel;
EventModel;
TicketTypeModel;
TicketModel;
BuyerModel;
TicketScanModel;
TicketTemplateModel;
// Set up associations between models
TicketTypeModel.hasMany(TicketModel, { foreignKey: 'ticketTypeCode', sourceKey: 'typeCode', as: 'tickets' });
TicketModel.belongsTo(TicketTypeModel, { foreignKey: 'ticketTypeCode', targetKey: 'typeCode', as: 'ticket_type' });

EventModel.hasMany(TicketModel, { foreignKey: 'eventId', as: 'tickets' });
TicketModel.belongsTo(EventModel, { foreignKey: 'eventId', as: 'event' });

BuyerModel.hasMany(TicketModel, { foreignKey: 'buyerId', as: 'tickets' });
TicketModel.belongsTo(BuyerModel, { foreignKey: 'buyerId', as: 'buyer' });

TicketModel.hasMany(TicketScanModel, { foreignKey: 'ticketId', as: 'ticket_scans' });
TicketScanModel.belongsTo(TicketModel, { foreignKey: 'ticketId', as: 'ticket' });

TicketTemplateModel.belongsTo(TicketTypeModel, {
  foreignKey: 'ticketTypeCode',
  targetKey: 'typeCode',
  as: 'ticket_type',
});
TicketTypeModel.hasMany(TicketTemplateModel, {
  foreignKey: 'ticketTypeCode',
  sourceKey: 'typeCode',
  as: 'ticket_templates',
});

TicketTemplateModel.belongsTo(EventModel, {
  foreignKey: 'eventId',
  as: 'event',
});
EventModel.hasMany(TicketTemplateModel, { foreignKey: 'eventId', as: 'ticket_templates' });

export { UserModel, EventModel, TicketTypeModel, TicketModel, BuyerModel, TicketScanModel, TicketTemplateModel };
