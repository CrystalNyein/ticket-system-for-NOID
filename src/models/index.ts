import UserModel from './User';
import TicketModel from './Ticket';
import TicketTypeModel from './TicketType';
import EventModel from './Event';
import BuyerModel from './Buyer';
import TicketScanModel from './TicketScan';

UserModel;
EventModel;
TicketTypeModel;
TicketModel;
BuyerModel;
TicketScanModel;
// Set up associations between models
TicketTypeModel.hasMany(TicketModel, { foreignKey: 'ticket_type_code', sourceKey: 'type_code', as: 'tickets' });
TicketModel.belongsTo(TicketTypeModel, { foreignKey: 'ticket_type_code', targetKey: 'type_code', as: 'ticket_type' });

EventModel.hasMany(TicketModel, { foreignKey: 'event_id', as: 'tickets' });
TicketModel.belongsTo(EventModel, { foreignKey: 'event_id', as: 'event' });

BuyerModel.hasMany(TicketModel, { foreignKey: 'buyer_id', as: 'tickets' });
TicketModel.belongsTo(BuyerModel, { foreignKey: 'buyer_id', as: 'buyer' });

TicketModel.hasMany(TicketScanModel, { foreignKey: 'ticket_id', as: 'ticket_scans' });
TicketScanModel.belongsTo(TicketModel, { foreignKey: 'ticket_id', as: 'ticket' });

export { UserModel, EventModel, TicketTypeModel, TicketModel, BuyerModel, TicketScanModel };
