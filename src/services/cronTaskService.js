import { CronTask } from '../models/CronTask.js'

class CronTaskService {
  /**
   * Get all cron tasks with their current execution status
   */
  async getAllTasksWithStatus() {
    return await CronTask.findAll()
  }
}

export default new CronTaskService()
