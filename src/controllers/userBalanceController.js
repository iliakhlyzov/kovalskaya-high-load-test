import { Router } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validateRequest.js'
import userBalanceService from '../services/userBalanceService.js'

class UserBalanceController {
  constructor() {
    this.router = Router()

    this.initRoutes()
  }

  initRoutes() {
    this.router.get('/', this.getAll.bind(this))
    this.router.put(
      '/:id',
      body('delta').isNumeric().withMessage('Delta must be a numeric value'),
      validateRequest,
      this.update.bind(this),
    )
  }

  /**
   * Get All
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  async getAll(req, res) {
    try {
      const result = await userBalanceService.getAll()

      res.json(result)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { delta } = req.body

      // TODO: Обработать delta = 0
      const updatedRecord = await userBalanceService.updateBalance(id, delta)
      res.json(updatedRecord)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default new UserBalanceController().router
