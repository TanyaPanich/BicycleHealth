const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const boom = require('boom')
const jwt = require('../utilities/jwtUtil')
const UserService = require('../database/services/userService')

router.get('/', (req, res, next) => {
  console.log("I on login/login")
  res.render('login', {
    title: 'Bicycle health'
  })
})

router.post('/', (req, res, next) => {

  console.log("loginPost:", req.body)
  //res.json({data: 'ok'})
  // res.render('index', {
  //   title: 'Bicycle health'
  // })
  const userService = new UserService()
  return jwt(
    'login',
    req.body.email,
    res,
    userService.getByEmail(req.body.email)
    .then(user => bcrypt.compare(req.body.password, user.hashed_password)
    .then(match => {
      console.log("loginPost bcrypt:", match,user)
      if (!match) throw boom.unauthorized('invalid email or password')
      res.render('index', { title: 'Bicycle health' })
    }))
  ).catch(err => {
    next(err)
  })
})

module.exports = router
