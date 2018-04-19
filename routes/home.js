const express = require('express')
const router = express.Router()
const { APP_TITLE } = require('../utilities/uiUtil')

router.get('/', (req, res, next) => {
  res.render('index', { title: APP_TITLE })
})

module.exports = router
