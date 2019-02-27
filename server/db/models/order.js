const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  total: Sequelize.INTEGER
})

module.exports = Order
