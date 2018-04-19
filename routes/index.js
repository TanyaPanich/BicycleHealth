const express = require('express')
const router = express.Router()

/* GET login and signup page. */
router.get('/', (req, res, next) => {
  console.log('GET: index - login and signup')
  res.render('loginSignup', { title: 'Bicycle Health' })
})

router.delete('/', (req, res, next) => {
  console.log("LOGOUT -----> BYE")
 res.setHeader('Set-Cookie', `token=;`)
 res.status(200).send(true)
})

module.exports = router
