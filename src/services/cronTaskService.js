import { CronTask, CronTaskLog } from '../models/CronTask.js'

class CronTaskService {
  /**
   * Get all cron tasks with their current execution status
   */
  async getAll() {
    return await CronTask.findAll({
      include: [
        {
          model: CronTaskLog,
          as: 'logs',
          required: false,
          order: [['finishedAt', 'DESC']],
          limit: 1,
        },
      ],
    })
  }
}

export default new CronTaskService()
