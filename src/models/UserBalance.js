import { DataTypes } from 'sequelize'
import sequelize from '../database/index.js'

const UserBalance = sequelize.define(
  'UserBalance',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: 'userBalance',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
)

export default UserBalance
