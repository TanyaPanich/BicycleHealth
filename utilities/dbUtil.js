const express = require('express')
const boom = require('boom')

const UserService = require('../database/services/userService')

const userService = new UserService()

function retrieveUser(req, res, next) {
  if (req.token.email) {
    userService.getByEmail(req.token.email)
      .then((user) => {
        req.user = user
        next()
      })
      .catch(() => {
        next(boom.unauthorized())
      })
  }
  else {
    next(boom.unauthorized())
  }
}

module.exports = {
  retrieveUser
}
