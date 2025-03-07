import 'dotenv/config'
import express from 'express'
import sequelize from './database/index.js'

const PORT = process.env.PORT || 3000

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  const app = express()

  app.use('/health', (req, res) => res.status(200).send('HEALTHY'))

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
