import { Router } from 'express'
import cronTaskService from '../services/cronTaskService.js'

class CronTaskController {
  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  initRoutes() {
    this.router.get('/', this.getAll.bind(this))
  }

  /**
   * Get All cron tasks with current status
   */
  async getAll(req, res, next) {
    const tasks = await cronTaskService.getAll()
    res.json(tasks)
  }
}

export default new CronTaskController().router
