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
  console.log("I on login/signup")
  try {
    res.render('signup', {
      title: 'Bicycle health'
    })
  }
  catch (err) {
    console.log('signup err', err);
  }
}

const login = (req, res, next) => {
  console.log("I on login/login")
  res.render('login', {
    title: 'Bicycle health'
  })
}

const handleResponse = (op, email, httpRes, user) => {
  console.log('handleResponse')
  console.log(`${op} succeeded for user ${email}:`, user)
  const token = jwt.sign({
    'email': email
  }, process.env.SECRET_KEY)
  httpRes.setHeader('Set-Cookie', `token=${token};`)
}

const signupPost = (req, res, next) => {
  console.log("signupPost:", req.body)

  const teamService = new TeamService()
  const userService = new UserService()
  teamService.getDefault()
    .then(teamId => {
      const inputUser = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        hashed_password: bcrypt.hashSync(req.body.password1, 8),
        access_type: 'normal',
        team_id: teamId.id
      }
      console.log('team_id', inputUser.team_id)
      return inputUser
    })
    .then((user) => {
      return userService.insert(user)
    })
    .then((user) => {
      handleResponse('signup', user.email, res, user)
      res.json({ message: 'Success' })
    })
    .catch((err) => {
      console.log('err while signing up', err)
      next(err)
    })
  //
  //
  // return handleResponse(
  //   'signup',
  //   req.body.email,
  //   res,
  //   teamService.getDefault().then(teamId => {
  //     const inputUser = {
  //       first_name: req.body.firstName,
  //       last_name: req.body.lastName,
  //       email: req.body.email,
  //       hashed_password: bcrypt.hashSync(req.body.password1, 8),
  //       access_type: 'normal',
  //       team_id: teamId.id
  //     }
  //     console.log("team_id:", inputUser.team_id)
  //     userService.insert(inputUser)
  //       .then(() => {
  //         res.render('index', { title: 'Bicycle health' })
  //       })
  //   })
  // ).catch(err => {
  //   next(err)
  // })
}

const loginPost = (req, res, next) => {

  console.log("loginPost:", req.body)
  //res.json({data: 'ok'})
  // res.render('index', {
  //   title: 'Bicycle health'
  // })
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
      res.render('index', { title: 'Bicycle health' })
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

router.get('/test', (req, res, next) => {
  res.render('index', { title: 'Bicycle health' })
})

module.exports = router
