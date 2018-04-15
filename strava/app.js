if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const http = require('http')
const debug = require('debug')('strava:server')
const port = process.env.PORT || '8000'
const server = http.createServer()
const path = require('path')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const express = require('express')
const strava = require('strava-v3')

const app = express()
app.disable('x-powered-by')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const STRAVA_ACCESS_TOKEN = process.env.PASCAL_ACCESS_TOKEN
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET
const STRAVA_USER_ID = process.env.PASCAL_STRAVA_ID
const STRAVA_GEAR_ID = process.env.PASCAL_GEAR_ID

const stravaConfig = {
  access_token: STRAVA_ACCESS_TOKEN,
  per_page: 50
  // client_id: STRAVA_CLIENT_ID,
  // client_secret: STRAVA_CLIENT_SECRET
}

const writeFileConfig = {
  encoding: 'utf8',
  flag: 'w'
}
// console.log(strava)

/* GET Strava Activities. */
app.get('/strava/activities', (req, res, next) => {
  stravaConfig.type = 'Ride'
  stravaConfig.gear_id = STRAVA_GEAR_ID
  stravaConfig.id = STRAVA_USER_ID

  strava.athletes.stats(stravaConfig, (error1, data) => {
    if (error1) {
      next(error1)
    }
    else {
      strava.athlete.listActivities(stravaConfig, (error2, activities, limits) => {
        console.log('limits', limits)
        if(error2) {
          next(error2)
        }
        else {
          fs.writeFile(`./strava/data/activities.json`, JSON.stringify(activities), writeFileConfig, (error3) => {
            if (error3) {
              next(error3)
            }
          })
          console.log(activities.length)
          res.json(activities)
        }
      })
    }
  })
})

app.get('/strava/activities/:activity_id', (req, res, next) => {
  stravaConfig.id = req.params.activity_id
  // stravaConfig.splits = false
  // stravaConfig.segment_leaderboard_opt_out = true
  // stravaConfig.segment = false

  strava.activities.get(stravaConfig, (err, payload, limits) => {
    if(!err) {
      fs.writeFile(`./strava/data/${req.params.activity_id}.json`, JSON.stringify(payload), writeFileConfig, (error, data) => {
        if (error) {
          next(error)
        }
        else {
          res.json(payload)
        }
      })
    }
    else {
      console.log(err)
      next(err)
    }
  })
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(boom.notFound())
})

// error handler
app.use((err, req, res, next) => {
  console.log(err)
  // return error in JSON
  if (err.output) {
    res.status(err.output.statusCode || 500)
    res.json(err.output.payload)
  }
  else {
    res.json(err)
  }
})

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port)
  }
})

app.on('error', onError)
app.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  /* eslint-disable */
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
  /* eslint-enable */
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
