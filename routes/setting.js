const express = require('express')
 const router = express.Router()
+const jwt = require('jsonwebtoken')
+const UserService = require('../database/services/userService')
+const BikeService = require('../database/services/bikeService')
+
+function verifyToken(req, res, next) {
+    if(!req.cookies.token) {
+      return next(boom.unauthorized())
+    }
+    const token = req.cookies.token
+    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
+      if (err) {
+        return next(boom.unauthorized())
+      }
+    req.token = decoded
+    next()
+  })
+}
+
+router.get('/', verifyToken, (req, res, next) => {
+  console.log('GET: bike page')
+  console.log('For user: ', req.token.email)
+  const contype = req.headers['content-type']
+  console.log('content:', contype)
+
+  const userService = new UserService()
+  const bikeService = new BikeService()
+  userService.getByEmail(req.token.email)
+  .then(user => bikeService.list(user.id))
+  .then(bikes => {
+    console.log('settings GET success', bikes)
+    if (contype && contype.indexOf('application/json') === 0) {
+      console.log('returnign json')
+      let bikesByName = {}
+      for (bike of bikes) {
+        bikesByName[bike.nick_name] = bike
+      }
+      res.json({ bikes: bikesByName })
+    } else {
+      console.log('returnign html')
+    res.render('settings', {
+      title: 'Bicycle Health',
+      bikes: bikes
+    })
+   }
+  })
+  .catch(err => {
+    console.log('settings GET err', err)
+    next(err)
+  })
+})
+
+router.post('/', verifyToken, (req, res, next) => {
+  console.log('POST: add-edit bike', req.body)
+  console.log('For user: ', req.token.email)
+  const userService = new UserService()
+  const bikeService = new BikeService()
+  userService.getByEmail(req.token.email)
+  .then(user => {
+    console.log(user.id)
+    const newBike = {
+      nick_name: req.body.nickname,
+      type: req.body.type,
+      brand: req.body.brand,
+      model: req.body.model,
+      //strava_gear_id:'',
+      //distance: 0,
+      distance_unit: 'miles',
+      user_id: user.id,
+    }
+    console.log('newBike', newBike)
+    return bikeService.insert(newBike)
+  })
+  .then(result => {
+    console.log('settings POST success', result)
+    res.status(200)
+  })
+  .catch(err => {
+    console.log('settings POST err', err)
+    next(err)
+  })
+})
+
+router.delete('/', verifyToken, (req, res, next) => {
+  console.log('DELETE: add-edit bike', req.body)
+  console.log('For user: ', req.token.email)
+  const bikeService = new BikeService()
+  return bikeService.delete(req.body.bikeid)
+  .then(result => {
+    console.log('settings DELETE success', result)
+    res.status(200)
+  })
+  .catch(err => {
+    console.log('settings DELETE err', err)
+    next(err)
+  })
+})

-router.get('/', (req, res, next) => {
-  res.render('settings', { title: 'Bicycle health' })
+router.patch('/', verifyToken, (req, res, next) => {
+  console.log('PATCH: add-edit bike', req.body)
+  console.log('For user: ', req.token.email)
+  const bikeService = new BikeService()
+  const bike = {
+    id: req.body.bikeid,
+    nick_name: req.body.nickname,
+    type: req.body.type,
+    brand: req.body.brand,
+    model: req.body.model,
+    strava_gear_id: req.body.strava_gear_id,
+    distance: parseInt(req.body.distance),
+    distance_unit: req.body.distance_unit
+  }
+  console.log('PATCH: bike obj', bike)
+  return bikeService.update(bike)
+  .then(result => {
+    console.log('settings PATCH success', result)
+    res.status(200)
+  })
+  .catch(err => {
+    console.log('settings PATCH err', err)
+    next(err)
+  })
 })

 module.exports = router
