import Joi from 'joi';

export default {
  createTicket: Joi.object({
    eventId: Joi.string().required(),
    ticketTypeCode: Joi.string().required(),
    ticketTemplatePath: Joi.string().required(),
  }),
  generateBulkTickets: Joi.object({
    eventId: Joi.string().required(),
    ticketTypeCode: Joi.string().required(),
    totalCount: Joi.number().required(),
    ticketTemplatePath: Joi.string().required(),
  }),
  updateTicket: Joi.object({
    status: Joi.string().valid('available', 'sold', 'revoked', 'expired').required(),
    buyer_id: Joi.string().when('status', {
      is: 'sold',
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  }),
};
