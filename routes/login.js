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
  //console.log('POST: login', req.body)
  const userService = new UserService()
  userService.getByEmail(req.body.email)
    .then(user =>
      bcrypt.compare(req.body.password, user.hashed_password,
        (match) => {
          if (!match) next(boom.unauthorized('invalid email or password'))
          //res.render('index', { title: 'Bicycle health' })
          jwt(
            'login',
            user.email,
            res,
            user
          )
         res.json({ message: 'Success' })
        })
    )
    .catch(err => {
      console.log('err while login', err)
      next(err)
    })
})

module.exports = router
