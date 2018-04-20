const express = require('express')
const router = express.Router()
const {
  APP_TITLE
} = require('../utilities/uiUtil')
const bcrypt = require('bcrypt')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const {
  handleResponse,
  verifyToken
} = require('../utilities/jwtUtil')
const {
  retrieveUser
} = require('../utilities/dbUtil')
const TeamService = require('../database/services/teamService')
const UserService = require('../database/services/userService')

router.get('/', verifyToken, (req, res, next) => {
  const userService = new UserService()
  const contype = req.headers['content-type']

  userService.getByEmail(req.token.email)
    .then(user => {
      console.log(user)
      return user
    })
    .then(user => {
      console.log('returnign html')
      // res.json(user)
      res.render('profile', {
        title: APP_TITLE,
        user: user
      })
    })

    .catch(err => {
      console.log('changeProfile GET err', err)
      next(err)
    })
})

router.patch('/', verifyToken, retrieveUser, (req, res, next) => {
  console.log('PATCH: profile page!!!!!!!')
  console.log(req.body)
  const userService = new UserService()

  if (req.body.userId) {
    // need to update distance in all the parts
    const user = {
      id: uuid(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      hashed_password: user.hashed_password,
      strava_user_id: user.strava_user_id,
      strava_access_token: user.strava_access_token,
      access_type: user.access_type,
      team_id: user.team_id
    }
    console.log("user", user);
    return userService.update(user)
      .then(result => {
        console.log('profile PATCH success', result)
        //res.status(200)
        res.status(200).json({
          message: 'Success'
        })
      })
      .catch(err => {
        console.log('profile PATCH err', err)
        next(err)
      })
  }
})


module.exports = router
