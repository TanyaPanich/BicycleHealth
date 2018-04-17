const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v4')
const { defaultTeamId } = require('../database/utils')
const TeamService = require('../database/services/teamService')


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
  //const teamService = new TeamService()

  console.log("I am on insert!", req.body)
  if(!req.body.email) next(boom.badRequest('Email must not be blank'))
  isEmailExist(req.body.email, next)
  if(!req.body.password1 || req.body.password1.length < 3)
    next(boom.badRequest('Password must be at least 8 characters long'))

  knex('users')
    .returning(['id','first_name','last_name', 'email'])
    .insert({
        id : uuid(),
        first_name : req.body.firstName,
        last_name : req.body.lastName,
        email : req.body.email,
        access_type : 'normal',
        team_id : '9318a7bf-faa7-47bf-9d60-fd5c4ed7ac39',
        // team_id : teamService.getDefault(),
        hashed_password : bcrypt.hashSync(req.body.password1, 8)
    }).then((user) => {
      console.log("User successfully inserted", user)

      const token = jwt.sign({'email': req.body.email }, process.env.SECRET_KEY)
      res.setHeader('Set-Cookie', `token=${token};`)
      res.render('index', { title: 'Bicycle health' })
    }).catch(err => {
      console.log("Failed to insert User", req.body.email)
      console.log("ERR in insert:", err)

        next(err)
    })
}

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


router.get('/', loginSignup)
router.get('/signup', signup)
router.post('/signup', insert)
router.get('/login', login)

module.exports = router
