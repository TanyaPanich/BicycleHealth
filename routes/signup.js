const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const boom = require('boom')
const { handleResponse } = require('../utilities/jwtUtil')
const { APP_TITLE } = require('../utilities/uiUtil')
const TeamService = require('../database/services/teamService')
const UserService = require('../database/services/userService')

router.get('/', (req, res, next) => {
  console.log('GET: signup')
  try {
    res.render('signup', {
      title: APP_TITLE
    })
  }
  catch (err) {
    console.log('signup err', err)
  }
})

router.post('/', (req, res, next) => {
  console.log('POST: signup', req.body)

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
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log('backend err while signing up', err)
      next(err)
    })
})

module.exports = router
