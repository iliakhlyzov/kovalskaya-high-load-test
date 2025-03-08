import { ExtendedError } from '../errors/ExtendedError.js'

/**
 * Error Handler
 * @param err
 * @param req
 * @param res
 * @param _next
 * @returns {*}
 */
export const errorHandler = (err, req, res, _next) => {
  if (err instanceof ExtendedError) {
    return res.status(err.status).json({
      error: err.message,
      ...(err.details && { details: err.details }),
    })
  }

  console.error('Unexpected error:', err)
  res.status(500).json({ error: 'Internal server error' })
}
