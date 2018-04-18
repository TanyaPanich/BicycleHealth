const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const UserService = require('../database/services/userService')
const BikeService = require('../database/services/bikeService')

function verifyToken(req, res, next) {
    if(!req.cookies.token) {
      return next(boom.unauthorized())
    }
    const token = req.cookies.token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return next(boom.unauthorized())
      }
    req.token = decoded
    next()
  })
}

router.get('/', verifyToken, (req, res, next) => {
  console.log('GET: bike page')
  console.log('decoded', req.token.email)
  const userService = new UserService()
  const bikeService = new BikeService()
  userService.getByEmail(req.token.email)
  .then(user => {
    console.log(user.id)
    return user.id
  })
  .then(id => {
    const bikes = bikeService.list(id)
    console.log(bikes)
  })
})

module.exports = router
