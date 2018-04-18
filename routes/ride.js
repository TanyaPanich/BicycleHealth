const express = require('express')
const router = express.Router()

const { verifyToken } = require('../utilities/jwtUtil')
const { retrieveUser } = require('../utilities/dbUtil')
const BikeService = require('../database/services/bikeService')
const RideService = require('../database/services/rideService')
const ConditionService = require('../database/services/conditionService')

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
          title: 'Bicycle Health',
          bikes: list
        })
      }
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/for/:bikeId', verifyToken, retrieveUser, (req, res, next) => {
  console.log('GET: ride for bike')
  console.log('For user: ', req.token.email)
  console.log('For params: ', req.params)
  // console.log('headers', req.headers)
  const rideService = new RideService()
  rideService.list(req.params.bikeId)
    .then((list) => {
      console.log('returning json')
      res.json({ rides: list })
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
})

router.post('/', verifyToken, retrieveUser, (req, res, next) => {
  console.log('POST: ride page')
  console.log(req.body)
  const rideService = new RideService()
  const conditionService = new ConditionService()

  const ride = {
    name: req.body.name,
    bike_id: req.body.bikeid,
    rode_at: new Date(req.body.date),
    distance: parseInt(req.body.distance, 10),
    distance_unit: 'mile'
  }
  rideService.insert(ride)
    .then((added) => added)
    .catch((err) => null)
    .then((added) => {
      if (added) {
        Promise.all([
          conditionService.insert({
            ride_id: added.id,
            type: 'weather',
            condition: req.body.weather
          }),
          conditionService.insert({
            ride_id: added.id,
            type: 'road',
            condition: req.body.road
          })
        ])
          .then(() => {
            res.status(200).json({ message: 'OK' })
          })
          .catch((err) => {
            next(boom.badImplementation())
          })
      }
      else {
        next(boom.badImplementation())
      }
    })
})

router.patch('/', verifyToken, retrieveUser, (req, res, next) => {

})

router.delete('/', verifyToken, retrieveUser, (req, res, next) => {

})

module.exports = router
