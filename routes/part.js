const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const UserService = require('../database/services/userService')
const BikeService = require('../database/services/bikeService')
const PartService = require('../database/services/partService')

function verifyToken(req, res, next) {
  if (!req.cookies.token) {
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
      if (contype && contype.indexOf('application/json') === 0) {
        console.log('returnign json')
        let bikesByName = {}
        let bikeNamesById = {}
        let promisedParts = []
        for (bike of bikes) {
          bikesByName[bike.nick_name] = bike
          bikesByName[bike.nick_name].parts = {}
          bikeNamesById[bike.id] = bike.nick_name
          promisedParts.push(partService.list(bike.id))
        }
        Promise.all(promisedParts).then(allBikesParts => {
          for (oneBikeParts of allBikesParts) {
            if (oneBikeParts.length > 0) {
              let partsByName = {}
              let bikeName = bikeNamesById[oneBikeParts[0].bike_id]
              for (part of oneBikeParts) {
                partsByName[part.name] = part
              }
              bikesByName[bikeName].parts = partsByName
            }
          }
          console.log('addPart GET bikes success', bikesByName)
          //console.log('bikesByName[bike1].parts', bikesByName.bike1.parts)
          res.json({
            bikes: bikesByName
          })
        })
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

router.post('/', verifyToken, (req, res, next) => {
  console.log('POST: add PART', req.body)
  console.log('For user: ', req.token.email)
  const bikeService = new BikeService()
  const partService = new PartService()

  bikeService.getByName(req.body.bikeName)
    .then(bike => {
      console.log('bike id is: ', bike.id)
      const newPart = {
        name: req.body.partName,
        bike_id: bike.id,
        brand: req.body.partBrand,
        model: req.body.partModel,
        max_life_span: parseInt(req.body.maxLifeSpan),
        distance: parseInt(req.body.estMileage),
        unit: 'miles'
      }
      console.log('newPart will be inserted now!!! ', newPart)
      return partService.addIfNotExist(newPart)
    })
    .then(result => {
      console.log('addPart POST success ---->', result)
      res.status(200).json({
        message: 'Success'
      })
    })
    .catch(err => {
      console.log('addPart POST fails <-----')
      next(err)
    })
})

router.patch('/', verifyToken, (req, res, next) => {
  console.log('PATCH: edit part', req.body)
  console.log('For user: ', req.token.email)
  const partService = new PartService()
  const part = {
    id: req.body.partId,
    name: req.body.partName,
    brand: req.body.partBrand,
    model: req.body.partModel,
    max_life_span: parseInt(req.body.maxLifeSpan),
    distance: parseInt(req.body.estMileage),
    unit: 'miles'
  }
  console.log('PATCH: part obj', part)
  return partService.update(part)
    .then(result => {
      console.log('addPart PATCH success', result)
      //res.status(200)
      res.status(200).json({
        message: 'Success'
      })
    })
    .catch(err => {
      console.log('addPart PATCH err', err)
      next(err)
    })
})

router.delete('/', verifyToken, (req, res, next) => {
  console.log('DELETE: delete part', req.body)
  const partService = new PartService()
  return partService.delete(req.body.partId)
  .then(result => {
    console.log('Part DELETE success', result)
    res.status(200).json({ message: 'Success'})
  })
  .catch(err => {
    console.log('Part DELETE err', err)
    next(err)
  })
})

module.exports = router
