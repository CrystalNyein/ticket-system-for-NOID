import Joi from 'joi';

export default {
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
};
