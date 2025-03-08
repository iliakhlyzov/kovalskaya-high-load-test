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
    const userBalance = await UserBalance.findByPk(id)

    if (!userBalance) {
      throw new Error('User balance record not found')
    }

    const newBalance = userBalance.balance + delta

    if (newBalance < 0) {
      throw new Error('Resulting balance cannot be negative')
    }

    userBalance.balance = newBalance
    return await userBalance.save()
  }
}

export default new UserBalanceService()
