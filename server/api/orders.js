const router = require('express').Router()
const {User, Order} = require('../db/models')
const {isLoggedIn, hasRightToAccessOrder} = require('./utils')
module.exports = router

router.put('/:orderId/checkout', isLoggedIn, async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const data = await Order.findById(orderId)
    if (!data) res.sendStatus(404)
    const userId = data.userId
    // change order status to 'processing'
    await Order.update(
      {
        status: 'processing'
      },
      {
        where: {id: orderId}
      }
    )
    // store shipping and billing info on User table
    const updated = await User.update(
      {
        email: req.body.email,
        cardNumber: req.body.cardNumber,
        legalName: req.body.legalName,
        shipping: req.body.shipping
      },
      {
        where: {
          id: userId
        }
      }
    )
    // create new cart
    const newOrder = await Order.create({
      status: 'cart',
      userId: userId
    })
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})
