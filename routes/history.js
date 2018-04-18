const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('history', { title: 'Bicycle Health' })
})

module.exports = router
