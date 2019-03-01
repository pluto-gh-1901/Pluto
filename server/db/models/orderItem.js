const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    },
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderItem
