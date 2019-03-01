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
    console.log('USERIDFROM ROUTES:::', userId)
    const cartItems = await Order.findOne({
      where: {userId, status: 'cart'},
      include: [
        {
          model: OrderItem,
          include: [{model: Product}]
        }
      ]
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

router.put('/:userId/checkout', async (req, res, next) => {
  try {
    const id = req.params.userId
    const user = await User.findById(id)
    if (!user) res.sendStatus(404)
    const updated = await user.update({
      address: req.body.address,
      email: req.body.email,
      cardNumber: req.body.cardNumber,
      legalName: req.body.legalName,
      shipping: req.body.shipping
    })
  } catch (err) {
    next(err)
  }
})
