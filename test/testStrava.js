process.env.NODE_ENV = 'test'

const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const StravaApiService = require('../utilities/stravaApi')
const strava = new StravaApiService()

describe('database service check', () => {
  it('read strava data from file', (done) => {
    strava.collectStravaInFile()
      .then((results) => {
        done()
      })
  })
})
