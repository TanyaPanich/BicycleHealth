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
  const contype = req.headers['content-type']
  console.log('content:', contype)
  const bikeService = new BikeService()
  const repairService = new RepairService()
  bikeService.list(req.user.id)
    .then((bikeList) => {
      if(bikeList.length === 0) {
        return null
      }
      return Promise.all(bikeList.map((bike) => repairService.listAll(bike.id)))
    })
    .then((repairs) => {
      if(repairs) {
        return repairs.map((repair, index) => {
          return repair.reduce((acc, element) => {
            console.log(element)
            element.repair_date = convertDateToString(element.repair_date)
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
      } else {
        return null
      }
    })
    .then((repairs) => {
      if (repairs) {
        if (contype && contype.indexOf('application/json') === 0) {
          res.json({ history: repairs })
        }
        else {
          res.render('history', {
            title: APP_TITLE,
            repairs: repairs,
            text: ''
          })
        }
      } else {
        res.render('history', {
          title: APP_TITLE,
          repairs: [],
          text: 'There are no repair records yet'
        })
      }
    })
    .catch((err) => {
      console.log('err', err)
      next(err)
    })
})

function convertDateToString(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = (date.getDate()).toString().padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

module.exports = router
