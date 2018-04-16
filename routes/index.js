const express = require('express')
const router = express.Router()

/* GET home page. */

const index = (req, res, next) => {
  res.render('index', { title: 'Bicycle health' })
}

const addBicycle = (req, res, next) => {
  res.render('addBicycle', { title: 'Bicycle health' })
}

const addPart = (req, res, next) => {
  res.render('addPart', { title: 'Bicycle health' })
}

const addRide = (req, res, next) => {
  res.render('addRide', { title: 'Bicycle health' })
}

router.get('/', index)
router.get('/bicycle', addBicycle)
router.get('/part', addPart)
router.get('/ride', addRide)

module.exports = router
