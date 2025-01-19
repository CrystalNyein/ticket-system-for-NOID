import Joi from 'joi';

export default {
  createEvent: Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    startDate: Joi.date().min(new Date().setHours(0, 0, 0, 0)).required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
  }),
  updateEvent: Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    startDate: Joi.date().min(new Date().setHours(0, 0, 0, 0)),
    endDate: Joi.date().min(Joi.ref('startDate')),
  }),
};
