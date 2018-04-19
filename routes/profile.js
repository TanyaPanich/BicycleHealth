const express = require('express')
const router = express.Router()
const { APP_TITLE } = require('../utilities/uiUtil')
const bcrypt = require('bcrypt')
const boom = require('boom')
const jwt = require('jsonwebtoken')
const { handleResponse, verifyToken } = require('../utilities/jwtUtil')
const TeamService = require('../database/services/teamService')
const UserService = require('../database/services/userService')

router.get('/', verifyToken, (req, res, next) => {
  console.log(req.token.email)
  console.log(req)
  res.render('profile', {
    title: APP_TITLE
  })
})

router.patch('/', verifyToken, (req, res, next) => {
  console.log('PATCH: ride page')
  console.log(req.body)

  // const userService = new UserService()
  // const bikeService = new BikeService()
  // const partService = new PartService()
  // const rideService = new RideService()
  //
  // userService.getByEmail(req.token.email)
  //   .then(user => bikeService.list(user.id))
  //   .then(bikes => {
  //     if (contype && contype.indexOf('application/json') === 0) {
  //       console.log('returnign json')
  //       let bikesByName = {}
  //       let bikeNamesById = {}
  //       let promisedParts = []
  //       for (bike of bikes) {
  //         bikesByName[bike.nick_name] = bike
  //         bikesByName[bike.nick_name].parts = {}
  //         bikeNamesById[bike.id] = bike.nick_name
  //         promisedParts.push(partService.list(bike.id))
  //       }
  //       Promise.all(promisedParts).then(allBikesParts => {
  //         for (oneBikeParts of allBikesParts) {
  //           if (oneBikeParts.length > 0) {
  //             let partsByName = {}
  //             let bikeName = bikeNamesById[oneBikeParts[0].bike_id]
  //             for (part of oneBikeParts) {
  //               partsByName[part.name] = part
  //             }
  //             bikesByName[bikeName].parts = partsByName
  //           }
  //         }
  //         console.log('addPart GET bikes success', bikesByName)
  //         //console.log('bikesByName[bike1].parts', bikesByName.bike1.parts)
  //         res.json({
  //           bikes: bikesByName
  //         })
  //       })
  //     } else {
  //       console.log('returnign html')
  //       res.render('addPart', {
  //         title: APP_TITLE,
  //         bikes: bikes
  //       })
  //     }
  //   })
  //   .catch(err => {
  //     console.log('changeProfile GET err', err)
  //     next(err)
  //   })
})

module.exports = router
