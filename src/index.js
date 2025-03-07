import 'dotenv/config'
import * as express from 'express'
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

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}

main()
