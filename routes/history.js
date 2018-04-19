const express = require('express')
const router = express.Router()

const { verifyToken } = require('../utilities/jwtUtil')
const { retrieveUser } = require('../utilities/dbUtil')
const BikeService = require('../database/services/bikeService')
const RepairService = require('../database/services/repairService')

router.get('/', verifyToken, retrieveUser, (req, res, next) => {
  console.log('GET: history page')
  console.log('For user: ', req.token.email)
  // console.log('headers', req.headers)
  const contype = req.headers['content-type']
  console.log('content:', contype)
  const bikeService = new BikeService()
  const repairService = new RepairService()
  console.log(req.user.id)
  bikeService.list(req.user.id)
    .then((bikeList) => {
      console.log(bikeList)
      return Promise.all(bikeList.map((bike) => repairService.listAll(bike.id)))
    })
    .then((repairs) => {
      console.log(repairs)
      // if (contype && contype.indexOf('application/json') === 0) {
      //   console.log('returning json')
      //   const bikesByName = {}
      //   for (bike of list) {
      //     bikesByName[bike.nick_name] = bike
      //   }
      //   res.json({ bikes: bikesByName })
      // }
      // else {
      //   console.log('returning html')
      //   res.render('history', {
      //     title: 'Bicycle Health',
      //     bikes: list
      //   })
      // }
      res.json({message: 'OK'})
    })
    .catch((err) => {
      console.log('err', err)
      next(err)
    })
})

module.exports = router
