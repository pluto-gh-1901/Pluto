const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models')
module.exports = router

router.get('/cart', async (req, res, next) => {
  try {
    const cartItems = await Order.findOne({
      where: {
        userId: req.body
      }
    })
  } catch (err) {
    next(err)
  }
})
