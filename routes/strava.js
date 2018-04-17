const express = require('express')
const strava = require('strava-v3')
const passport = require('passport')
const util = require('util')
const StravaStrategy = require('passport-strava-oauth2').Strategy
const path = require('path')
const jwt = require('jsonwebtoken')
const { initializeDefaultTeamId } = require('../database/utils')
const UserService = require('../database/services/userService')
const TeamService = require('../database/services/teamService')
require('dotenv').config()

const router = express.Router()

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
  process.nextTick(() => {
    // return userService.getByEmail(profile.emails[0].value)
    // this is for now to force creating new user record.
    return userService.getByEmail('jen@email.com')
      .then((row) => {
        console.log('it cannot be here')
        return done(null, profile)
      })
      .catch((err) => {
        return teamService.getDefault()
      })
      .then((team) => {
        const user = {
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
          strava_user_id: profile.id,
          strava_access_token: accessToken,
          access_type: 'strava',
          team_id: team.id
        }
        return userService.insert(user)
      })
      .then((row) => {
        return done(null, profile)
      })
  })
}))


router.get('/', (req, res, next) => {
  console.log(res.headers)
  res.json({ title: 'I am here'})
})

// GET /login/strava
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Strava authentication will involve
//   redirecting the user to strava.com.  After authorization, Strava
//   will redirect the user back to this application at /auth/strava/callback
router.get('/oauth', passport.authenticate('strava', { scope: ['public'] }),
  (req, res) => {
    // The request will be redirected to Strava for authentication, so this
    // function will not be called.
  })

// GET /login/strava/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/oauth/callback', passport.authenticate('strava', { failureRedirect: '/' }),
  (req, res) => {
    res.render('index', { title: 'Bicycle health' })
  })

module.exports = router
