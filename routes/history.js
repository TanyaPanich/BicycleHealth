const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('hi!!!')

  //local storage doesn't exist on the backend, need to use ajax to store the localStorage from the front end.
  // let partObj = JSON.parse(localStorage.getItem('partObj'))
  // console.log(partObj)

  res.render('history', { title: 'Bicycle Health' })

})

module.exports = router
