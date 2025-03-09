import { QueryTypes } from 'sequelize'
import { ApiError } from '../errors/ApiError.js'
import UserBalance from '../models/UserBalance.js'

/**
 * UserBalanceService
 */
class UserBalanceService {
  /**
   * Get all
   * @returns {Promise<UserBalance[]>}
   */
  async getAll() {
    return await UserBalance.findAll()
  }

  /**
   * Update user balance by applying a delta amount.
   * @param {string} id - User balance record ID.
   * @param {number} delta - The amount to add (can be positive or negative).
   * @returns {Promise<UserBalance|null>}
   */
  async updateBalance(id, delta) {
    const [results] = await UserBalance.sequelize.query(
      `
      UPDATE "user_balance"
      SET balance = balance + :delta
      WHERE id = :id
        AND balance + :delta >= 0
      RETURNING *;
      `,
      {
        replacements: { id, delta },
        type: QueryTypes.UPDATE,
      },
    )

    if (!results.length) {
      throw ApiError.badRequest('insufficient funds in the account')
    }

    return results[0]
  }
}

export default new UserBalanceService()
