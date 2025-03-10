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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    intervalSec: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'interval_sec',
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
    lockedBy: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'locked_by',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'cron_tasks',
    timestamps: true,
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
      type: DataTypes.ENUM('pending', 'success', 'error'),
      allowNull: false,
    },
    instanceId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'instance_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'cron_task_logs',
    timestamps: true,
  },
)

CronTask.hasMany(CronTaskLog, { foreignKey: 'taskId', as: 'logs' })
CronTaskLog.belongsTo(CronTask, { foreignKey: 'taskId', as: 'task' })

export { CronTask, CronTaskLog }
