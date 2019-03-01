const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderItem')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
Order.belongsTo(User)
User.hasMany(Order)

// OrderItem.belongsTo(Product)
// Product.hasMany(OrderItem)

// OrderItem.belongsTo(Order)
// Order.hasMany(OrderItem)

Order.belongsToMany(Product, {through: {model: OrderItem}})
Product.belongsToMany(Order, {through: {model: OrderItem}})

module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
