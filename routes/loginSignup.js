const express = require('express')
const router = express.Router()

const loginSignup = (req, res, next) => {
  res.render('loginSignup', { title: 'Bicycle health' })
}

const signup = (req, res, next) => {
  res.render('signup', { title: 'Bicycle health' })
}

const login = (req, res, next) => {
  res.render('login', { title: 'Bicycle health' })
}

router.get('/', loginSignup)
router.get('/signup', signup)
router.get('/login', login)

module.exports = router
