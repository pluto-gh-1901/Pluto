const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'http://automation.crouzet.com/wp-content/themes/innovistasensors_wp-theme_crouzet-brands/assets/algolia/img/no-image-available.jpg'
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Product
