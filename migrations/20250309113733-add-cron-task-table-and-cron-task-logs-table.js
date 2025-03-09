import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable(
      'cron_tasks',
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
        last_run_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        current_run_started_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        locked_until: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        locked_by: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      { transaction },
    )

    await queryInterface.createTable(
      'cron_task_logs',
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4,
        },
        task_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'cron_tasks',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        started_at: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        finished_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('success', 'error'),
          allowNull: false,
        },
        instance_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      { transaction },
    )

    await queryInterface.addIndex('cron_tasks', ['locked_until', 'enabled'], {
      transaction,
    })
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('cron_task_logs', { transaction })
    await queryInterface.dropTable('cron_tasks', { transaction })
  })
}
