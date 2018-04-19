const express = require('express')
const router = express.Router()

const { verifyToken } = require('../utilities/jwtUtil')
const { retrieveUser } = require('../utilities/dbUtil')
const { APP_TITLE } = require('../utilities/uiUtil')
const BikeService = require('../database/services/bikeService')
const RepairService = require('../database/services/repairService')

router.get('/', verifyToken, retrieveUser, (req, res, next) => {
  console.log('GET: history page')
  console.log('For user: ', req.token.email)
  console.log('headers', req.headers)
  const contype = req.headers['content-type']
  console.log('content:', contype)
  const bikeService = new BikeService()
  const repairService = new RepairService()
  bikeService.list(req.user.id)
    .then((bikeList) => {
      return Promise.all(bikeList.map((bike) => repairService.listAll(bike.id)))
    })
    .then((repairs) => {
      return repairs.map((repair, index) => {
        return repair.reduce((acc, element) => {
          if (acc.bike_name) {
            acc.history.push(element)
          }
          else {
            acc.bike_name = element.bike_nick_name
            acc.history = []
            acc.history.push(element)
          }
          return acc
        }, {})
      })
    })
    .then((repairs) => {
      if (contype && contype.indexOf('application/json') === 0) {
        res.json({ history: repairs })
      }
      else {
        res.render('history', {
          title: APP_TITLE,
          repairs: repairs
        })
      }
    })
    .catch((err) => {
      console.log('err', err)
      next(err)
    })
})

module.exports = router
