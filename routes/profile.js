const express = require('express')
const router = express.Router()
const { APP_TITLE } = require('../utilities/uiUtil')
const bcrypt = require('bcrypt')
const boom = require('boom')
const { handleResponse, verifyToken } = require('../utilities/jwtUtil')
const TeamService = require('../database/services/teamService')
const UserService = require('../database/services/userService')

//grey out email -- not changeable
//prepopulate all other fields

router.get('/', (req, res, next) => {
  res.render('profile', { title: APP_TITLE })
})


router.patch('/', verifyToken, (req, res, next) => {
  console.log('PATCH: profile', req.body)

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
      // return inputUser
    })
    .then((user) => {
      return userService.update(user)
    })
    .then((user) => {
      handleResponse('profile', user.email, res, user)
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log('backend err while signing up', err)
      next(err)
    })
})

module.exports = router
