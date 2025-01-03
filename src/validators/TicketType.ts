import Joi from 'joi';

export default {
  createOrUpdateTicketType: Joi.object({
    type_code: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};
