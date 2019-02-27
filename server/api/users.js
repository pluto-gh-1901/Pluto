const router = require('express').Router()
const {User, Cart} = require('../db/models')
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
  userId: 1,
  items: [
    {
      id: 50,
      name: 'apple',
      price: 1,
      quantity: 3,
      image:
        'https://media.gettyimages.com/photos/red-apple-picture-id186843005?s=612x612'
    },
    {
      id: 51,
      name: 'orange',
      price: 2,
      quantity: 2,
      image: 'https://www.marlerblog.com/files/2013/03/orange.jpg'
    }
  ]
}

router.get('/cart', (req, res, next) => {
  try {
    res.json(userCart.items)
  } catch (err) {
    next(err)
  }
})
