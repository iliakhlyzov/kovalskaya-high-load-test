import { DataTypes } from 'sequelize'
import sequelize from '../database/index.js'

const CronTask = sequelize.define(
  'CronTask',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    lastRunAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    currentRunStartedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lockedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lockedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'cron_tasks',
  },
)

const CronTaskLog = sequelize.define(
  'CronTaskLog',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'CronTask',
        key: 'id',
      },
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('success', 'error'),
      allowNull: false,
    },
    instanceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'cron_task_logs',
  },
)

CronTask.hasMany(CronTaskLog, { foreignKey: 'taskId', as: 'logs' })
CronTaskLog.belongsTo(CronTask, { foreignKey: 'taskId', as: 'task' })

export { CronTask, CronTaskLog }
