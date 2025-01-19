import Joi from 'joi';
import { updateUser } from '../controllers/User';

export default {
  createUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.valid('admin', 'event_manager', 'staff').required(),
  }),
  updateUser: Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8),
    role: Joi.valid('admin', 'event_manager', 'staff'),
  }),
};
