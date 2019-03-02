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
    let cartItems = await Order.findOne({
      where: {userId, status: 'cart'}
      // include: [
      //   {
      //     model: OrderItem,
      //     include: [{model: Product}]
      //   }
      //
    })
    if (!cartItems) {
      cartItems = await Order.create({userId, status: 'cart'})
    }
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})
