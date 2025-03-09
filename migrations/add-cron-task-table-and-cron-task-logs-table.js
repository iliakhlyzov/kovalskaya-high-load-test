import * as Sequelize from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('cronTasks', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    intervalSec: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    enabled: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    lastRunAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    currentRunStartedAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    lockedBy: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    lockedUntil: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  })

  await queryInterface.createTable('cronTaskLogs', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    taskId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'cronTasks',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    startedAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    finishedAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: Sequelize.DataTypes.ENUM('success', 'error'),
      allowNull: false,
    },
    instanceId: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  })

  // await queryInterface.addIndex('cronTasks', ['lockedUntil', 'enabled'])
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('cronTaskLogs')
  await queryInterface.dropTable('cronTasks')
}
