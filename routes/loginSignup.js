const express = require('express')
const router = express.Router()
const knex = require('../knex')
const { camelizeKeys, decamelizeKeys } = require('humps')
const bcrypt = require('bcrypt');
const boom = require('boom')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

const loginSignup = (req, res, next) => {
  res.render('loginSignup', { title: 'Bicycle health' })
}

const signup = (req, res, next) => {
  res.render('signup', { title: 'Bicycle health' })
}

const login = (req, res, next) => {
  res.render('login', { title: 'Bicycle health' })
}

const insert = (req, res, next) => {
  if(!req.body.email) next(boom.badRequest('Email must not be blank'))
  isEmailExist(req.body.email, next)
  if(!req.body.password1 || req.body.password1.length < 8)
    next(boom.badRequest('Password must be at least 8 characters long'))

  knex('users')
    .returning(['id','first_name','last_name', 'email'])
    .insert({
        'first_name': req.body.firstName,
        'last_name': req.body.lastName,
        'email': req.body.email,
        'hashed_password': bcrypt.hashSync(req.body.password, 8)
    }).then((user) => {
      const token = jwt.sign({'email': req.body.email }, process.env.JWT_KEY)
      res.setHeader('Set-Cookie', `token=${token}; Path=\/;.+HttpOnly`)
      res.send(camelizeKeys(user[0]));
    }).catch(err => {
        next(err)
    })


  function isEmailExist(email, next) {
    knex('users')
    .then(data => {
      for(let user of data) {
        if(user.email === email) {
          return next(boom.badRequest('Email already exists'))
        }
      }
    })
  }
}

router.get('/', loginSignup)
router.get('/signup', signup)
router.post('/signup', insert)
router.get('/login', login)

module.exports = router
