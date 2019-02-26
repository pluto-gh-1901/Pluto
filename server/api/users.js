const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
let userCart = {
  items: [{id: 50, name: 'apple', price: 1, quantity: 4, image: 'imageUrl'}]
}

router.get('/cart', (req, res, next) => {
  try {
    res.json(userCart.items)
  } catch (err) {
    next(err)
  }
})
