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
};
