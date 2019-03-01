const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    console.log('ORDER INFO ON ROUTE: ', req.body.orderInfo)
    const price = Number(req.body.orderInfo.price)
    const quantity = Number(req.body.orderInfo.quantity)
    const productId = Number(req.body.orderInfo.productId)
    const orderId = Number(req.body.orderInfo.orderId)

    let orderInfo = {price, quantity, productId, orderId}

    const oldOrderItem = await OrderItem.findOne({where: {productId}})
    if (oldOrderItem) {
      await OrderItem.update({quantity}, {where: {productId}})
    } else {
      const newOrderItem = await OrderItem.create(orderInfo)
    }
    res.json()
  } catch (err) {
    next(err)
  }
})
