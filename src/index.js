import 'dotenv/config'
import 'express-async-errors'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import userBalanceController from './controllers/userBalanceController.js'
import sequelize from './database/index.js'
import { errorHandler } from './middlewares/errorHandler.js'

const PORT = process.env.PORT || 3000

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  const app = express()

  app.use(cors())
  app.use(morgan('dev'))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(errorHandler)

  app.use('/health', (req, res) => res.status(200).send('HEALTHY'))
  app.use('/user-balance', userBalanceController)

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

main()
