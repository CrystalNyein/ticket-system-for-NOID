import Joi from 'joi';

export default {
  createTicketType: Joi.object({
    type_code: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
  }),
  updateTicketType: Joi.object({
    type_code: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
  }),
};
