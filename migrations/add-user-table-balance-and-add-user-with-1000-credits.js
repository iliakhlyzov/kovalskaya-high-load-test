import * as Sequelize from 'sequelize'

const uuid = '39b7468a-604a-4637-b959-548ba5de3bb1'

export async function up({ context: queryInterface }) {
  await queryInterface.createTable('userBalance', {
    id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    balance: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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

  await queryInterface.addConstraint('userBalance', {
    fields: ['balance'],
    type: 'check',
    where: {
      balance: {
        [Sequelize.Op.gte]: 0,
      },
    },
    name: 'balance_non_negative',
  })

  await queryInterface.bulkInsert('userBalance', [
    {
      id: uuid,
      balance: 10000,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('userBalance')
}
