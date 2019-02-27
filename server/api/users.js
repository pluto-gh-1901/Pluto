const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models')
module.exports = router

router.get('/cart', (req, res, next) => {
  try {
    res.json(userCart.items)
  } catch (err) {
    next(err)
  }
})
