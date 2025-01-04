import Joi from 'joi';

export default {
  createEvent: Joi.object({
    name: Joi.string().required(),
    descirption: Joi.string(),
    start_date: Joi.date().greater('now').required(),
    end_date: Joi.date().greater(Joi.ref('start_date')).required(),
  }),
  updateEvent: Joi.object({
    name: Joi.string(),
    descirption: Joi.string(),
    start_date: Joi.date().greater('now'),
    end_date: Joi.date().greater(Joi.ref('start_date')),
  }),
};
