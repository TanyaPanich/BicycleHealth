const express = require('express')
const router = express.Router()

//grey out email -- not changeable
//prepopulate all other fields

router.get('/', (req, res, next) => {
  res.render('profile', { title: 'Bicycle Health' })
})

module.exports = router
