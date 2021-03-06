const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const boom = require('boom')
const { handleResponse } = require('../utilities/jwtUtil')
const { APP_TITLE } = require('../utilities/uiUtil')
const UserService = require('../database/services/userService')

router.get('/', (req, res, next) => {
  console.log('GET: login')
  res.render('login', {
    title: APP_TITLE
  })
})

router.post('/', (req, res, next) => {
  const userService = new UserService()
  userService.getByEmail(req.body.email)
    .then(user =>
      bcrypt.compare(req.body.password, user.hashed_password)
        .then(match => {
          if (match) {
            handleResponse('login', user.email, res, user)
            res.sendStatus(200)
          }
          else {
            next(boom.unauthorized('invalid email or password'))
          }
        })
    )
    .catch(err => {
      next(boom.unauthorized('invalid email or password'))
    })
})

module.exports = router
