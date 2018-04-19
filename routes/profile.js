const express = require('express')
const router = express.Router()
const { APP_TITLE } = require('../utilities/uiUtil')

//grey out email -- not changeable
//prepopulate all other fields

router.get('/', (req, res, next) => {
  res.render('profile', { title: APP_TITLE })
})

module.exports = router
