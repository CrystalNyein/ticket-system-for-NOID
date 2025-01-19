import Joi from 'joi';

export default {
  uploadTicketTemplate: Joi.object({
    ticketTypeCode: Joi.string().required(),
    eventId: Joi.string().required(),
    file: Joi.object().keys({
      mimetype: Joi.string().valid('image/jpeg', 'image/png').required().messages({
        'string.base': 'File type must be an image (jpeg, png)',
        'any.only': 'File type must be an image (jpeg, png)',
      }),
      size: Joi.number()
        .max(5 * 1024 * 1024)
        .required()
        .messages({
          'number.base': 'File size must be less than 5MB',
          'number.max': 'File size must be less than 5MB',
        }),
    }),
  }),
  checkTicketTemplate: Joi.object({
    eventId: Joi.string().required(),
    ticketTypeCode: Joi.string().required(),
  }),
};
