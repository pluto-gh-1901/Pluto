const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  item: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    },
    defaultValue: 1
  }
})

module.exports = OrderItem
