const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['cancelled', 'processing', 'delivered', 'cart']]
    }
  },
  total: Sequelize.INTEGER
})

module.exports = Order
