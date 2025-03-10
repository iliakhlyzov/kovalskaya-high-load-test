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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        interval_sec: {
          type: DataTypes.INTEGER,
          allowNull: false,
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
        status: {
          // TODO: set enum
          type: DataTypes.ENUM('pending', 'success', 'error'),
          allowNull: false,
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
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('cron_task_logs', { transaction })
    await queryInterface.dropTable('cron_tasks', { transaction })
  })
}
