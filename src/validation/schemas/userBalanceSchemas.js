import Joi from 'joi'

export const idSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    'string.uuid': 'ID must be a valid UUID',
    'any.required': 'ID is required',
  }),
})

export const updateBalanceSchema = Joi.object({
  delta: Joi.number().invalid(0).required().messages({
    'any.invalid': '"delta" cannot be 0',
    'number.base': '"delta" must be a number',
    'any.required': '"delta" is required',
  }),
})
