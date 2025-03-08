import { ExtendedError } from './ExtendedError.js'

export class ApiError extends ExtendedError {
  /**
   * @param {number} status - HTTP статус ошибки.
   * @param {string} message - Сообщение об ошибке.
   * @param {any} [details] - Дополнительные данные (опционально).
   */
  constructor(status, message, details = null) {
    super(status, message)
    this.details = details
  }

  static badRequest(message, details = null) {
    return new ApiError(400, message, details)
  }

  static unauthorized(message, details = null) {
    return new ApiError(401, message, details)
  }

  static forbidden(message, details = null) {
    return new ApiError(403, message, details)
  }

  static notFound(message, details = null) {
    return new ApiError(404, message, details)
  }

  static unprocessableEntity(message, details = null) {
    return new ApiError(422, message, details)
  }

  static internal(message, details = null) {
    return new ApiError(500, message, details)
  }
}
