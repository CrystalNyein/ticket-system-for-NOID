import Joi from 'joi';

export default {
  createOrUpdateUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    role: Joi.valid('admin', 'event_manager', 'staff').required(),
  }),
};
