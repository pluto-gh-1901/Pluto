const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
      const price = Number(req.body.orderInfo.price)
      const quantity = Number(req.body.orderInfo.quantity)
      const productId = Number(req.body.orderInfo.productId)
      const orderId = Number(req.body.orderInfo.orderId)

      let orderInfo = {price, quantity, productId, orderId}

      const oldOrderItem = await OrderItem.findOne({
        where: {productId, orderId}
      })
      if (!oldOrderItem) {
        const newOrderItem = await OrderItem.create(orderInfo)
      }
      res.json()
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    let currentOrder
    const userId = req.params.userId
    currentOrder = await Order.findOne({where: {userId, status: 'cart'}})
    res.json(currentOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/remove', async (req, res, next) => {
  try {
    let orderId = req.body.orderId
    let productId = req.body.productId
    await OrderItem.destroy({where: {orderId, productId}})
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
