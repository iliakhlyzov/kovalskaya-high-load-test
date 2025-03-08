// middlewares/validateSchema.js
import Joi from 'joi'

/**
 * Универсальная функция-валидатор, которая принимает схему и имя свойства запроса (body, params, query)
 * и возвращает middleware для проверки.
 * @param {Joi.Schema} schema - Схема валидации.
 * @param {string} property - Свойство запроса для проверки (по умолчанию 'body').
 */
export function validateSchema(schema, property = 'body') {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false })

    if (error) {
      return res.status(400).json({
        errors: error.details.map((detail) => detail.message),
      })
    }

    next()
  }
}
