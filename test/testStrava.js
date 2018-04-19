process.env.NODE_ENV = 'test'

const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const knex = require('../knex')
const StravaApiService = require('../utilities/stravaApi')
const strava = new StravaApiService()

const UserService = require('../database/services/userService')

beforeEach((done) => {
  knex.migrate.rollback().then(() => {
    return knex.migrate.latest()
  }).then(() => {
    return knex.seed.run()
  }). finally(() => {
    done()
  })
})

afterEach((done) => {
  knex.migrate.rollback(). finally(() => {
    done()
  })
})

after(() => {
  knex.destroy()
})

describe('strava API service check', () => {
  it('read strava data from file', (done) => {
    const userService = new UserService()

    strava.collectStravaInFile()
      .then((results) => {
        if (results.length === 2) {
          const { bikes, unit, email } = results[0]
          const { activities } = results[1]
          assert.isNotNull(bikes, 'Bicycle list is not null')
          assert.isNotNull(unit, 'Unit exists')
          assert.isNotNull(email, 'Email exists')
          assert.isNotNull(activities, 'Activity list is not null')
          return { bikes, unit, email, activities }
        }
      })
      .then((data) => {
        const { bikes, unit, email, activities } = data
        return userService.getByEmail(email)
          .then((user) => {
            return { bikes, unit, email, activities, user }
          })
          .catch((err) => {
            return { bikes, unit, email, activities }
          })
      })
      .then((data) => {
        const { bikes, unit, email, activities, user } = data
        if (user) {
          // const array = bikes.map((bike) => strava.findBikeByStravaId(bike.strava_gear_id))
          return Promise.all(
            bikes.map((bike) => strava.findBikeByStravaId(bike.strava_gear_id))
          )
            .then((results) => {
              assert(bikes.length === results.length, 'Bicycle should already exist in the database')
              data.bikesInDatabase = results
              return data
            })
        }
        else {
          assert.isNull(data.user, 'Unable to find user')
          return data
        }
      })
      .then((data) => {
        const { bikes, unit, email, activities, user, bikesInDatabase } = data
        if (user) {
          return Promise.all(strava.assignBikeToUser(bikes, bikesInDatabase, user.id))
            .then((what) => {
              data.bikesInDatabase = what
              return data
            })
            .catch((err) => {
              return data
            })
        }
        else {
          return data
        }
      })
      .then((data) => {
        const { unit, bikes, activities, bikesInDatabase } = data
        return Promise.all(strava.findActivitiesForBike(activities, bikesInDatabase))
          .then((activityInDB) => {
            data.activityInDB = activityInDB
            return data
          })
      })
      .then((data) => {
        const { unit, activityInDB } = data
        return Promise.all(strava.addNewActivities(activityInDB, unit))
          .then((results) => {
            done()
          })
      })
  })
})
