import Joi from 'joi';

export default {
  login: Joi.object({
    identifier: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
};
