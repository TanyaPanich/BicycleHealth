const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('loginSignup', { title: 'Bicycle health' })
})

module.exports = router
