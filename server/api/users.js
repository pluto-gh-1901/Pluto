const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/cart', async (req, res, next) => {
  try {
    const userId = req.body.userId
    let currentOrder = await Order.findOne({
      where: {userId, status: 'cart'},
      include: [{model: Product}]
    })
    if (!currentOrder) {
      currentOrder = await Order.create({userId, status: 'cart'})
    }
    let orderItems = await OrderItem.findAll({
      where: {orderId: currentOrder.id}
    })
    let order = {currentOrder, orderItems}
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/checkout', async (req, res, next) => {
  try {
    const orderId = req.body.orderId
    let cartItems = await OrderItem.findAll({
      where: {orderId}
    })
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

// fetch order with state cart for checkout
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const order = await Order.findOne({
      where: {userId, status: 'cart'},
      include: [
        {
          model: OrderItem,
          include: [{model: Product}]
        }
      ]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/updateTotal', async (req, res, next) => {
  try {
    const orderId = req.body.orderId
    const total = req.body.total
    const item = req.body.item
    const quantity = req.body.quantity
    console.log('req is ', req.body)
    let newTotal
    let currentOrder = await Order.findById(orderId)
    let orderItems = await OrderItem.findAll({where: {orderId}})
    let oldOrderItem = orderItems.filter(x => {
      return Number(x.productId) === Number(item)
    })
    if (oldOrderItem[0]) {
      let oldCost = oldOrderItem[0].quantity * oldOrderItem[0].price
      let newCost = quantity * oldOrderItem[0].price
      let costDiff = newCost - oldCost
      OrderItem.update({quantity}, {where: {orderId, productId: item}})
      if (costDiff) {
        newTotal = currentOrder.total + costDiff
      } else {
        newTotal = currentOrder.total + total
      }
    } else {
      newTotal = currentOrder.total + total
    }
    let newOrderUpdate = await Order.update(
      {total: newTotal},
      {where: {id: orderId}}
    )
    res.json(newOrderUpdate)
  } catch (err) {
    next(err)
  }
})

router.put('/totalSub', async (req, res, next) => {
  try {
    const orderId = req.body.orderId
    const total = req.body.total
    let newOrderUpdate = await Order.update({total}, {where: {id: orderId}})
    res.json(newOrderUpdate)
  } catch (err) {
    next(err)
  }
})
