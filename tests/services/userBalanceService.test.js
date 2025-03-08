import { jest } from '@jest/globals'
import { QueryTypes } from 'sequelize'
import { ApiError } from '../../src/errors/ApiError.js'
import UserBalance from '../../src/models/UserBalance.js'
import userBalanceService from '../../src/services/userBalanceService.js'

describe('UserBalanceService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAll', () => {
    it('should return all records', async () => {
      const mockData = [
        { id: 'user1', balance: 1000 },
        { id: 'user2', balance: 2000 },
      ]

      // Mock UserBalance.findAll to return test data
      jest.spyOn(UserBalance, 'findAll').mockResolvedValue(mockData)

      const result = await userBalanceService.getAll()
      expect(result).toEqual(mockData)
      expect(UserBalance.findAll).toHaveBeenCalledTimes(1)
    })

    it('should handle errors (e.g., DB failure)', async () => {
      jest
        .spyOn(UserBalance, 'findAll')
        .mockRejectedValue(new Error('DB error'))

      await expect(userBalanceService.getAll()).rejects.toThrow('DB error')
      expect(UserBalance.findAll).toHaveBeenCalledTimes(1)
    })
  })

  describe('updateBalance', () => {
    it('should successfully update the balance if sufficient funds are available', async () => {
      // Mock return value: an array where the first element represents updated rows
      const mockReturn = [[{ id: 'user1', balance: 500 }]]

      jest.spyOn(UserBalance.sequelize, 'query').mockResolvedValue(mockReturn)

      const result = await userBalanceService.updateBalance('user1', -500)
      expect(result).toEqual({ id: 'user1', balance: 500 })
      expect(UserBalance.sequelize.query).toHaveBeenCalledTimes(1)
      expect(UserBalance.sequelize.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE "userBalance"'),
        expect.objectContaining({
          replacements: { id: 'user1', delta: -500 },
          type: QueryTypes.UPDATE,
        }),
      )
    })

    it('should throw ApiError if no rows are updated (insufficient funds)', async () => {
      // Simulate a scenario where no rows were updated (empty array)
      const mockReturn = [[]]
      jest.spyOn(UserBalance.sequelize, 'query').mockResolvedValue(mockReturn)

      await expect(
        userBalanceService.updateBalance('user1', -2000),
      ).rejects.toThrowError(ApiError)
      await expect(
        userBalanceService.updateBalance('user1', -2000),
      ).rejects.toThrow('insufficient funds in the account')
      expect(UserBalance.sequelize.query).toHaveBeenCalledTimes(2)
    })

    it('should handle other DB errors', async () => {
      jest
        .spyOn(UserBalance.sequelize, 'query')
        .mockRejectedValue(new Error('DB error'))

      await expect(
        userBalanceService.updateBalance('user1', -500),
      ).rejects.toThrow('DB error')
      expect(UserBalance.sequelize.query).toHaveBeenCalledTimes(1)
    })
  })
})
