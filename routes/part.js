const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const UserService = require('../database/services/userService')
const BikeService = require('../database/services/bikeService')
const PartService = require('../database/services/partService')

function verifyToken(req, res, next) {
    if(!req.cookies.token) {
      return next(boom.unauthorized())
    }
    const token = req.cookies.token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return next(boom.unauthorized())
      }
    req.token = decoded
    next()
  })
}
router.get('/', verifyToken, (req, res, next) => {
  console.log('GET: part page')
  console.log('For user: ', req.token.email)
  const contype = req.headers['content-type']
  console.log('content:', contype)

  const userService = new UserService()
  const bikeService = new BikeService()
  const partService = new PartService()


  userService.getByEmail(req.token.email)
  .then(user => bikeService.list(user.id))
  .then(bikes => {
    console.log('addPart GET bikes success', bikes)
    if (contype && contype.indexOf('application/json') === 0) {
      console.log('returnign json')
      let bikesByName = {}
      for (bike of bikes) {
        bikesByName[bike.nick_name] = bike
      }
      res.json({ bikes: bikesByName })
    } else {
      console.log('returnign html')
      res.render('addPart', {
      title: 'Bicycle Health',
      bikes: bikes
    })
   }
  })
  .catch(err => {
    console.log('addPart GET err', err)
    next(err)
  })
})

module.exports = router
