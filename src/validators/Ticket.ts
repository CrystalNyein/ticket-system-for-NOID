import Joi from 'joi';

export default {
  createTicket: Joi.object({
    eventId: Joi.string().required(),
    ticketTypeCode: Joi.string().required(),
    ticketTemplate: Joi.string().required(),
  }),
  generateBulkTickets: Joi.object({
    eventId: Joi.string().required(),
    ticketTypeCode: Joi.string().required(),
    totalCount: Joi.number().required(),
    ticketTemplate: Joi.string().required(),
  }),
  updateTicket: Joi.object({
    status: Joi.string().valid('available', 'sold', 'revoked', 'expired').required(),
    buyerId: Joi.string().when('status', {
      is: 'sold',
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  }),
  scanTicket: Joi.object({
    qrData: Joi.string().required(),
  }),
  importTicketSales: Joi.object({
    eventId: Joi.string().required(),
    file: Joi.object().keys({
      mimetype: Joi.string().valid('xlsx', 'xls').required().messages({
        'string.base': 'File type must be an excel',
        'any.only': 'File type must be an excel',
      }),
    }),
  }),
  doorSales: Joi.object({
    eventId: Joi.string().required(),
    isRandom: Joi.boolean().required(),
    ticketCode: Joi.when('isRandom', { is: true, then: Joi.string().required(), otherwise: Joi.string().optional() }),
    ticketTypeCode: Joi.when('isRandom', { is: false, then: Joi.string().required(), otherwise: Joi.string().optional() }),
    ticketFrom: Joi.when('isRandom', { is: false, then: Joi.number().required(), otherwise: Joi.number().optional() }),
    ticketTo: Joi.when('isRandom', { is: false, then: Joi.number().required(), otherwise: Joi.number().optional() }),
    buyerName: Joi.string().required(),
    buyerPhone: Joi.string().required(),
    buyerEmail: Joi.string().allow('').optional(),
  }),
  ticketStatsByDate: Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  }),
  ticketStatsByEvent: Joi.object({
    eventId: Joi.string().required(),
  }),
  deleteTicketsByParam: Joi.object({
    eventId: Joi.string().required(),
    ticketTypeCode: Joi.string().required(),
  }),
};
