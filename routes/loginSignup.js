const express = require('express')
const router = express.Router()

const loginSignup = (req, res, next) => {
  res.render('loginSignup', { title: 'Bicycle health' })
}

const goToSignupPage = (req, res, next) => {
  //res.render('loginSignup', { title: 'Bicycle health' })
}

const signup = (req, res, next) => {
  res.render('signup', { title: 'Bicycle health' })
}

const login = (req, res, next) => {
  res.render('login', { title: 'Bicycle health' })
}

router.get('/', loginSignup)
router.post('/', goToSignupPage)
router.get('/signup', signup)
router.get('/login', login)

module.exports = router
