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
