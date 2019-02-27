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

router.get('/cart', (req, res, next) => {
  try {
    // res.send('API/USERS:::')
  } catch (err) {
    next(err)
  }
})
