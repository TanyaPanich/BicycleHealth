const express = require('express')
const router = express.Router()
const { APP_TITLE } = require('../utilities/uiUtil')
const { verifyToken } = require('../utilities/jwtUtil')
const UserService = require('../database/services/userService')
const BikeService = require('../database/services/bikeService')

router.get('/', verifyToken, (req, res, next) => {
  console.log('GET: bike page')
  console.log('For user: ', req.token.email)
  const contype = req.headers['content-type']
  console.log('content:', contype)

  const userService = new UserService()
  const bikeService = new BikeService()
  userService.getByEmail(req.token.email)
    .then(user => bikeService.list(user.id))
    .then(bikes => {
      // console.log('settings GET success', bikes)
      if (contype && contype.indexOf('application/json') === 0) {
        // console.log('returnign json')
        let bikesByName = {}
        for (bike of bikes) {
          bikesByName[bike.nick_name] = bike
        }
        res.json({
          bikes: bikesByName
        })
      } else {
        // console.log('returning html!!!')
        res.render('settings', {
          title: APP_TITLE,
          bikes: bikes
        })
      }
    })
    .catch(err => {
      console.log('settings GET err', err)
      next(err)
    })
})

module.exports = router
