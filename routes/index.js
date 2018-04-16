const express = require('express')
const router = express.Router()

/* GET home page. */

const index = (req, res, next) => {
  res.render('loginSignup', { title: 'Bicycle health' })
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

const settings = (req, res, next) => {
  res.render('settings', { title: 'Bicycle health' })
}

const profile = (req, res, next) => {
  res.render('profile', { title: 'Bicycle health' })
}

const history = (req, res, next) => {
  res.render('history', { title: 'Bicycle health' })
}

router.get('/', index)
router.get('/bicycle', addBicycle)
router.get('/part', addPart)
router.get('/ride', addRide)
router.get('/settings', settings)
router.get('/profile', profile)
router.get('/history', history)

module.exports = router
