import { Op, fn, literal } from 'sequelize'
import sequelize from '../database/index.js'
import { CronTask, CronTaskLog } from '../models/CronTask.js'
import tasks from './tasks.js'

const INSTANCE_ID = process.env.INSTANCE_ID || `instance-${crypto.randomUUID()}`

class CronTaskManager {
  constructor() {
    this.instanceId = INSTANCE_ID
  }

  async executeTask(task) {
    console.log(`Executing task: ${task.name} on ${this.instanceId}`)

    try {
      await tasks[task.name]()
      await this.logCompletion(task.id, 'success')
    } catch (error) {
      console.error(`❌ Task ${task.name} failed:`, error)
      await this.logCompletion(task.id, 'error')
    }
  }

  async logCompletion(taskId, status) {
    await sequelize.transaction(async (transaction) => {
      await CronTask.update(
        {
          lastRunAt: fn('NOW'),
          currentRunStartedAt: null,
          lockedBy: null,
          status,
        },
        { where: { id: taskId }, transaction },
      )

      await CronTaskLog.create(
        { finishedAt: fn('NOW'), instanceId: this.instanceId, taskId },
        {
          transaction,
        },
      )
    })
  }

  async getAvailableTask() {
    return await sequelize.transaction(async (transaction) => {
      const availableTask = await CronTask.findOne({
        where: {
          enabled: true,
          [Op.or]: [
            { lastRunAt: null },
            sequelize.literal(
              `last_run_at <= NOW() - INTERVAL '1 second' * interval_sec`,
            ),
          ],
          name: { [Op.in]: Object.keys(tasks) },
          status: {
            [Op.or]: [null, { [Op.not]: 'pending' }],
          },
        },
        order: [['lastRunAt', 'ASC']],
        transaction,
        lock: true,
      })

      if (availableTask) {
        await availableTask.update(
          {
            currentRunStartedAt: new Date(),
            lockedBy: this.instanceId,
            status: 'pending',
          },
          { transaction },
        )
      }

      return availableTask
    })
  }

  async processTasks() {
    const task = await this.getAvailableTask()

    if (task) {
      await this.executeTask(task)
    }
  }

  start() {
    console.log(`🚀 CronTaskManager started on ${this.instanceId}`)
    setInterval(() => {
      console.log(`CronTaskManager is working on ${this.instanceId}`)
      return this.processTasks()
    }, 10000)
  }
}

export const cronTaskManager = new CronTaskManager()
