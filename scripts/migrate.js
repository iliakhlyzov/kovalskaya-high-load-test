#!/usr/bin/env node
import 'dotenv/config'
import { SequelizeStorage, Umzug } from 'umzug'
import sequelize from '../src/database/index.js'

const umzug = new Umzug({
  migrations: {
    glob: 'migrations/*.js',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

const command = process.argv[2]

async function run() {
  try {
    await sequelize.authenticate()

    switch (command) {
      case 'up':
        await umzug.up()
        console.log('All pending migrations have been applied.')
        break
      case 'down':
        await umzug.down()
        console.log('Last migration has been reverted.')
        break
      case 'pending':
        console.log(await umzug.pending())
        break
      case 'executed':
        console.log(await umzug.executed())
        break
      default:
        console.log('Usage: migrate.js [up|down|pending|executed]')
    }
  } catch (error) {
    console.error('Migration error:', error)
  } finally {
    await sequelize.close()
  }
}

run()
