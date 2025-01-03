import Joi from 'joi';

export default {
  createOrUpdateEvent: Joi.object({
    name: Joi.string().required(),
    descirption: Joi.string(),
    start_date: Joi.date().greater('now').required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
  }),
};
