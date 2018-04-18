const express = require('express')
const router = express.Router()

const { verifyToken } = require('../utilities/jwtUtil')
const { retrieveUser } = require('../utilities/dbUtil')
const BikeService = require('../database/services/bikeService')

router.get('/', verifyToken, retrieveUser, (req, res, next) => {
  console.log('GET: ride page')
  console.log('For user: ', req.token.email)
  // console.log('headers', req.headers)
  const contype = req.headers['content-type']
  console.log('content:', contype)
  const bikeService = new BikeService()
  bikeService.list(req.user.id)
    .then((list) => {
      if (contype && contype.indexOf('application/json') === 0) {
        console.log('returning json')
        const bikesByName = {}
        for (bike of list) {
          bikesByName[bike.nick_name] = bike
        }
        res.json({ bikes: bikesByName })
      }
      else {
        console.log('returning html')
        res.render('addRide', {
          title: 'Bicycle health',
          bikes: list
        })
      }
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
