const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const boom = require('boom')
const jwt = require('../utilities/jwtUtil')
const UserService = require('../database/services/userService')

router.get('/', (req, res, next) => {
  console.log('GET: login')
  res.render('login', {
    title: 'Bicycle health'
  })
})

router.post('/', (req, res, next) => {
  //console.log('POST: res.headers', res.headers)
  const userService = new UserService()
  userService.getByEmail(req.body.email)
    .then(user =>
      bcrypt.compare(req.body.password, user.hashed_password)
      .then(match => {
        if(match) {
          jwt('login', user.email, res, user)
        } else {
          next(boom.unauthorized('invalid email or password'))
        }
      })
    )
    .catch(err => {
      next(boom.unauthorized('invalid email or password'))
    })
})

module.exports = router
