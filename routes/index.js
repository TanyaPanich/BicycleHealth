const express = require('express')
const router = express.Router()

/* GET login and signup page. */
router.get('/', (req, res, next) => {
  console.log('GET: index - login and signup')
  res.render('loginSignup', { title: 'Bicycle health' })
})

module.exports = router
