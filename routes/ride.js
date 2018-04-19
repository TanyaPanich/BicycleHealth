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
  console.log('For params: ', req.params)
  // console.log('headers', req.headers)
  const rideService = new RideService()
  const conditionService = new ConditionService()
  rideService.list(req.params.bikeId)
    .then((list) => {
      Promise.all(list.map((ride) => conditionService.list(ride.id)))
        .then((results) => {
          return list.map((ride, index) => {
            return {
              ride: ride,
              condition: results[index]
            }
          })
        })
        .then((results) => {
          res.json({ rides: results })
        })
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
      if (added)
      // need to add distance to all the parts
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
  console.log('PATCH: ride page')
  console.log(req.body)
  const rideService = new RideService()
  if (req.body.rideId) {
    // need to update distance in all the parts
    const ride = {
      id: req.body.rideId,
      name: req.body.name,
      bike_id: req.body.bikeid,
      rode_at: new Date(req.body.date),
      distance: parseInt(req.body.distance, 10),
      distance_unit: 'mile'
    }
    rideService.update(ride)
      .then((updated) => {
        res.status(200).json({ message: 'OK'})
      })
      .catch((err) => {
        next(err)
      })
  }
  else {
    next(boom.badRequest('Ride Id is missing'))
  }
})

router.delete('/', verifyToken, retrieveUser, (req, res, next) => {
  console.log('DELETE: ride page')
  console.log(req.body)
  const rideService = new RideService()
  if (req.body.rideId) {
    // need to update distance in all the parts
    rideService.delete(req.body.rideId)
      .then((deleted) => {
        res.status(200).json({ message: 'OK'})
      })
      .catch((err) => {
        // console.log('err', err)
        next(err)
      })
  }
  else {
    next(boom.badRequest('Ride Id is missing'))
  }
})

module.exports = router
