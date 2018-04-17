const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('addPart', { title: 'Bicycle health' })
})

module.exports = router
