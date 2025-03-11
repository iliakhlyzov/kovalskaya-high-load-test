import { DataTypes } from 'sequelize'

const tasks = [
  {
    id: '123e4567-e89b-42d3-a456-426614174000',
    name: 'clear_cache',
    interval_sec: 21,
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    name: 'send_reports',
    interval_sec: 22,
  },
  {
    id: 'a808884c-b6f8-4d5c-a28e-2b7b8d7f690d',
    name: 'optimize_database',
    interval_sec: 23,
  },
  {
    id: '3f8d1fcd-a46e-493e-b06f-e4b998c6e6a6',
    name: 'fetch_external_data',
    interval_sec: 24,
  },
  {
    id: 'd2648b9f-c2e8-4faa-a655-f1e7e5f5d59a',
    name: 'generate_daily_summary',
    interval_sec: 25,
  },
  {
    id: '79c1d956-97a3-4d18-9cc1-e1b5a14a4fae',
    name: 'update_exchange_rates',
    interval_sec: 26,
  },
  {
    id: '550ea79e-a837-4d6d-b289-6cfd8a419f8f',
    name: 'backup_database',
    interval_sec: 27,
  },
  {
    id: 'b39d6231-4c2a-4d7c-9f0c-0b493ee842a9',
    name: 'analyze_user_behavior',
    interval_sec: 28,
  },
  {
    id: 'e0a1ecdc-6c6b-4e5a-a12f-d7f86d71a29f',
    name: 'clear_temp_files',
    interval_sec: 29,
  },
  {
    id: '9fe1d5a7-dbf9-47d3-b733-da8bcac9b78f',
    name: 'monitor_system_health',
    interval_sec: 30,
  },
]

export async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert(
    'cron_tasks',
    tasks.map((task) => ({
      id: task.id,
      name: task.name,
      interval_sec: task.interval_sec,
      enabled: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
  )
}

export async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete('cron_tasks', {
    name: tasks.map((task) => task.name),
  })
}
