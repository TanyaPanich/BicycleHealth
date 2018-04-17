const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
const TeamService = require('../database/services/teamService')
const UserService = require('../database/services/userService')

const loginSignup = (req, res, next) => {
  res.render('loginSignup', {
    title: 'Bicycle health'
  })
}

const signup = (req, res, next) => {
  res.render('signup', {
    title: 'Bicycle health'
  })
}

const login = (req, res, next) => {
  res.render('login', {
    title: 'Bicycle health'
  })
}

const handleResponse = (op, email, httpRes, response) => {
  return response.then(user => {
    console.log(`${op} succeeded for user ${email}:`, user)
    const token = jwt.sign({
      'email': email
    }, process.env.SECRET_KEY)
    httpRes.setHeader('Set-Cookie', `token=${token};`)
    httpRes.render('index', {
      title: 'Bicycle health'
    })
  }).catch(err => {
    console.log(`${op} failed for user ${email}: ${err}`)
    throw err
  })
}

const signupPost = (req, res, next) => {
  console.log("signupPost:", req.body)

  const teamService = new TeamService()
  const userService = new UserService()
  return handleResponse(
    'signup',
    req.body.email,
    res,
    teamService.getDefault().then(teamId => {
      const inputUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        hashed_password: bcrypt.hashSync(req.body.password1, 8),
        access_type: 'normal',
        team_id: teamId.id
      }
      console.log("team_id:", inputUser.team_id)
      return userService.insert(inputUser)
    })
  ).catch(err => {
    next(err)
  })
}

const loginPost = (req, res, next) => {
  console.log("loginPost:", req.body)
  const userService = new UserService()
  return handleResponse(
    'login',
    req.body.email,
    res,
    userService.getByEmail(req.body.email)
    .then(user => bcrypt.compare(req.body.password, user.hashed_password)
    .then(match => {
      console.log("loginPost bcrypt:", match,user)
      if (!match) throw boom.unauthorized('invalid email or password')
      return user
    }))
  ).catch(err => {
    next(err)
  })
}

router.get('/', loginSignup)
router.get('/signup', signup)
router.post('/signup', signupPost)
router.get('/login', login)
router.post('/login', loginPost)

module.exports = router
