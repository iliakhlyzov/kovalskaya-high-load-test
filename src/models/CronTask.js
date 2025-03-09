import { DataTypes } from 'sequelize'
import sequelize from '../database/index.js'

const CronTask = sequelize.define(
  'CronTask',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
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
      field: 'last_run_at',
    },
    currentRunStartedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'current_run_started_at',
    },
    lockedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'locked_until',
    },
    lockedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'locked_by',
    },
  },
  {
    tableName: 'cron_tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
)

const CronTaskLog = sequelize.define(
  'CronTaskLog',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'task_id',
      references: {
        model: CronTask,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'started_at',
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'finished_at',
    },
    status: {
      type: DataTypes.ENUM('success', 'error'),
      allowNull: false,
    },
    instanceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'instance_id',
    },
  },
  {
    tableName: 'cron_task_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
)

CronTask.hasMany(CronTaskLog, { foreignKey: 'taskId', as: 'logs' })
CronTaskLog.belongsTo(CronTask, { foreignKey: 'taskId', as: 'task' })

export { CronTask, CronTaskLog }
