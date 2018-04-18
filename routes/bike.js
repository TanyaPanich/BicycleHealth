const express = require('express')
const router = express.Router()
const { verifyToken } = require('../utilities/jwtUtil')
const UserService = require('../database/services/userService')
const BikeService = require('../database/services/bikeService')

router.get('/', verifyToken, (req, res, next) => {
  console.log('GET: bike page')
  console.log('For user: ', req.token.email)
  console.log('headers', req.headers)
  const contype = req.headers['content-type']
  console.log('content:', contype)

  const userService = new UserService()
  const bikeService = new BikeService()
  userService.getByEmail(req.token.email)
  .then(user => bikeService.list(user.id))
  .then(bikes => {
    console.log('addBicycle GET success', bikes)
    if (contype && contype.indexOf('application/json') === 0) {
      console.log('returnign json')
      let bikesByName = {}
      for (bike of bikes) {
        bikesByName[bike.nick_name] = bike
      }
      res.json({ bikes: bikesByName })
    } else {
      console.log('returnign html')
    res.render('addBicycle', {
      title: 'Bicycle health',
      bikes: bikes
    })
   }
  })
  .catch(err => {
    console.log('addBicycle GET err', err)
    next(err)
  })
})

router.post('/', verifyToken, (req, res, next) => {
  console.log('POST: add-edit bike', req.body)
  console.log('For user: ', req.token.email)
  const userService = new UserService()
  const bikeService = new BikeService()
  userService.getByEmail(req.token.email)
  .then(user => {
    console.log(user.id)
    const newBike = {
      nick_name: req.body.nickname,
      type: req.body.type,
      brand: req.body.brand,
      model: req.body.model,
      //strava_gear_id:'',
      //distance: 0,
      distance_unit: 'miles',
      user_id: user.id,
    }
    console.log('newBike', newBike)
    return bikeService.insert(newBike)
  })
  .then(result => {
    console.log('addBicycle POST success', result)
    //res.status(200)
    res.status(200).json({ message: 'Success'})

  })
  .catch(err => {
    console.log('addBicycle POST err', err)
    next(err)
  })
})

router.delete('/', verifyToken, (req, res, next) => {
  console.log('DELETE: add-edit bike', req.body)
  console.log('For user: ', req.token.email)
  const bikeService = new BikeService()
  return bikeService.delete(req.body.bikeid)
  .then(result => {
    console.log('addBicycle DELETE success', result)
    res.status(200).json({ message: 'Success'})
  })
  .catch(err => {
    console.log('addBicycle DELETE err', err)
    next(err)
  })
})

router.patch('/', verifyToken, (req, res, next) => {
  console.log('PATCH: add-edit bike', req.body)
  console.log('For user: ', req.token.email)
  const bikeService = new BikeService()
  const bike = {
    id: req.body.bikeid,
    nick_name: req.body.nickname,
    type: req.body.type,
    brand: req.body.brand,
    model: req.body.model,
    strava_gear_id: req.body.strava_gear_id,
    distance: parseInt(req.body.distance),
    distance_unit: req.body.distance_unit
  }
  console.log('PATCH: bike obj', bike)
  return bikeService.update(bike)
  .then(result => {
    console.log('addBicycle PATCH success', result)
    //res.status(200)
    res.status(200).json({ message: 'Success'})

  })
  .catch(err => {
    console.log('addBicycle PATCH err', err)
    next(err)
  })
})

module.exports = router
