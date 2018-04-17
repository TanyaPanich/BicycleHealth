const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('profile', { title: 'Bicycle health' })
})

module.exports = router
