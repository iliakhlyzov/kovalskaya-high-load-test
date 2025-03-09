import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import userBalanceService from '../services/userBalanceService.js'
import {
  idSchema,
  updateBalanceSchema,
} from '../validation/schemas/userBalanceSchemas.js'

class UserBalanceController {
  constructor() {
    this.router = Router()

    this.initRoutes()
  }

  initRoutes() {
    this.router.get('/', this.getAll.bind(this))
    this.router.put(
      '/:id',
      validateSchema(idSchema, 'params'),
      validateSchema(updateBalanceSchema, 'body'),
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
    const result = await userBalanceService.getAll()

    res.json(result)
  }

  async update(req, res) {
    const { id } = req.params
    const { delta } = req.body

    const result = await userBalanceService.updateBalance(id, delta)

    res.json(result)
  }
}

export default new UserBalanceController().router
