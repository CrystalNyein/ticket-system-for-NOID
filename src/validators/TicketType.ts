import Joi from 'joi';

export default {
  createTicketType: Joi.object({
    typeCode: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
  }),
  updateTicketType: Joi.object({
    id: Joi.string(),
    typeCode: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
  }),
};
