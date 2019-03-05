const {Order} = require('../db/models')
const utilFunction = {}

utilFunction.isLoggedIn = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    let err = new Error('A client hit a route that requires login') // this error will show up in the server console
    err.status = 401
    res.redirect('/login')
    next(err)
  }
}
utilFunction.isRightUser = (req, res, next) => {
  if (req.user.id === +req.body.userId || req.user.id === +req.params.userId) {
    next()
  } else {
    let err = new Error('User not authorized ro request this information') // this error will show up in the server console
    err.status = 401
    res.redirect('/home')
    next(err)
  }
}
utilFunction.hasRightToAccessOrder = async (req, res, next) => {
  const orderId = req.params.orderId || req.body.orderId
  console.log('orderId', orderId)
  const order = await Order.findOne({
    where: {
      id: orderId
    }
  })
  if (order && req.user.id === order.userId) {
    next()
  } else {
    let err = new Error('User not authorized ro request this information') // this error will show up in the server console
    err.status = 401
    res.redirect('/home')
    next(err)
  }
}
utilFunction.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    let err = new Error('A client attempted to access an admin route') // this error will show up in the server console
    err.status = 403
    next(err)
  }
}

module.exports = utilFunction
