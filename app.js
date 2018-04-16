const boom = require('boom')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const stravaRouter = require('./routes/strava')
const loginSignupRouter = require('./routes/loginSignup')
//const homeRouter = require('./routes/home')

const app = express()
app.disable('x-powered-by')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/login', loginSignupRouter)
app.use('/strava', stravaRouter)
<<<<<<< HEAD
//app.use('/home', homeRouter)
=======
app.use('/home', homeRouter)
>>>>>>> phaser game in home.js


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(boom.notFound())
})

// error handler
app.use((err, req, res, next) => {
  // return error in JSON
  res.status(err.output.statusCode || 500)
  res.json(err.output.payload)
})

module.exports = app
