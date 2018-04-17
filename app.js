const boom = require('boom')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')

const indexRouter = require('./routes/index')
const stravaRouter = require('./routes/strava')
const loginSignupRouter = require('./routes/loginSignup')
//phaser
const homeRouter = require('./routes/home')

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

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter)
app.use('/login', loginSignupRouter)
app.use('/strava', stravaRouter)

//links to phaser game
app.use('/home', homeRouter)


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(boom.notFound())
})

// error handler
app.use((err, req, res, next) => {
  // return error in JSON
  //console.log("ERROR:",Object.keys(err))
  // for (x in err) {
  //   console.log("  key:",x, "val:", err[x])
  // }
  console.log("output:",err.output)
  res.status(err.output.statusCode || 500)
  //res.status(404)//.json(err.output.payload)
})

module.exports = app
