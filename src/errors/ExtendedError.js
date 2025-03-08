export class ExtendedError extends Error {
  /**
   * @param {number} status
   * @param {string} message
   */
  constructor(status, message) {
    super(message)
    this.status = status
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
