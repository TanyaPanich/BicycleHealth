const express = require('express')
const strava = require('strava-v3')
const passport = require('passport')
const boom = require('boom')
const util = require('util')
const StravaStrategy = require('passport-strava-oauth2').Strategy
const path = require('path')
const { handleResponse } = require('../utilities/jwtUtil')
const { APP_TITLE } = require('../utilities/uiUtil')
const UserService = require('../database/services/userService')
const TeamService = require('../database/services/teamService')
const BikeService = require('../database/services/bikeService')
const RideService = require('../database/services/rideService')
const StravaApiService = require('../utilities/stravaApi')
require('dotenv').config()

const router = express.Router()
const api = new StravaApiService()

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET
const STRAVA_CALLBACK_URL = process.env.STRAVA_CALLBACK_URL

const strategyConfig = {
  clientID: STRAVA_CLIENT_ID,
  clientSecret: STRAVA_CLIENT_SECRET,
  callbackURL: STRAVA_CALLBACK_URL,
  approvalPrompt: 'force'
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Strava profile is
//   serialized and deserialized.
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})

// Use the StravaStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Strava
//   profile), and invoke a callback with a user object.
passport.use(new StravaStrategy(strategyConfig, (accessToken, refreshToken, profile, done) => {
  // asynchronous verification, for effect...
  const userService = new UserService()
  const teamService = new TeamService()
  const bikeService = new BikeService()
  const rideService = new RideService()

  process.nextTick(() => {
    const firstName = profile.name.givenName
    const lastName = profile.name.familyName
    const email = profile.emails[0].value
    const stravaUserId = profile.id
    const stravaAccessToken = accessToken // need to encrypt it using jsonwebtoken

    return userService.getByEmail(profile.emails[0].value)
      .then((user) => {
        api.populateDatabase(stravaUserId, stravaAccessToken)
          .then((results) => {
            console.log('success 1 after collectStravaInformation')
          })
        return { user: user }
      })
      .catch((err) => {
        return teamService.getDefault()
      })
      .then((data) => {
        console.log('see data', data)
        if (data && data.user) {
          done(null, data.user)
        }
        else if (data) {
          const user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            strava_user_id: stravaUserId,
            strava_access_token: stravaAccessToken,
            access_type: 'strava',
            team_id: data.id
          }
          userService.insert(user)
            .then((newUser) => {
              console.log('user added', newUser)
              return api.populateDatabase(stravaUserId, stravaAccessToken)
            })
            .then((results) => {
              console.log('success 2 after collectStravaInformation', results)
              return done(null, user)
            })
            .catch((err) => {
              console.log('err 2 after collectStravaInformation', err)
            })
        }
        else {
          done(boom.unauthorized(), null)
        }
      })
  })
}))

router.get('/', (req, res, next) => {
  res.json({ title: 'I am here'})
})

// GET /strava/oauth
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Strava authentication will involve
//   redirecting the user to strava.com.  After authorization, Strava
//   will redirect the user back to this application at /strava/oauth/callback
router.get('/oauth', passport.authenticate('strava', { scope: ['public'] }),
  (req, res) => {
    console.log('oauth - should not be here')
    // The request will be redirected to Strava for authentication, so this
    // function will not be called.
  })

// GET /strava/oauth/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/oauth/callback', passport.authenticate('strava', { failureRedirect: '/' }),
  (req, res) => {
    console.log('callback', req.user)
    handleResponse('strava', req.user.email, res, req.user)
    // res.render('index', { title: APP_TITLE })
    res.redirect('/home')
  })

module.exports = router
