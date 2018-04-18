process.env.NODE_ENV = 'test'

const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const knex = require('../knex')
const StravaApiService = require('../utilities/stravaApi')
const strava = new StravaApiService()

const BikeService = require('../database/services/bikeService')
const RideService = require('../database/services/rideService')
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
    const bikeService = new BikeService()
    const rideService = new RideService()
    const userService = new UserService()

    strava.collectStravaInFile()
      .then((results) => {
        if (results.length === 2) {
          const { bikes, unit, email } = results[0]
          const { activities } = results[1]
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
          return Promise.all(
            bikes.map((bike) => bikeService
              .getByStravaId(bike.strava_gear_id)
              .then((bikeInDB) => bikeInDB)
              .catch((err) => null))
          )
            .then((results) => {
              data.bikesInDatabase = results
              return data
            })
        }
      })
      .then((data) => {
        const { bikes, unit, email, activities, user, bikesInDatabase } = data
        return Promise.all(
          bikesInDatabase.map((bike, index) => {
            if (!bike) {
              const newBike = bikes[index]
              newBike.user_id = user.id
              return bikeService.insert(newBike)
            }
            else {
              return bike
            }
          })
        )
          .then((what) => {
            data.bikesInDatabase = what
            return data
          })
      })
      .then((data) => {
        const { unit, activities, bikesInDatabase } = data
        return Promise.all(
          activities
            .reduce((acc, activity) => {
              const foundBikes = bikesInDatabase.filter((bike) => bike.strava_gear_id === activity.bike_id)
              if (foundBikes.length > 0) {
                activity.bike_id = foundBikes[0].id
                acc.push(activity)
              }
              return acc
            }, [])
        )
          .then((activityInDB) => {
            data.activityInDB = activityInDB
            return data
          })
      })
      .then((data) => {
        const { unit, activityInDB } = data
        return Promise.all(
          activityInDB.map((activity) => rideService
            .getByStravaId(activity.ride_id)
            .then((inDb) => null)
            .catch((err) => activity))
        )
          .then((results) => {
            results.forEach((activity) => {
              if (activity) {
                activity.distance_unit = unit
                activity.strava_ride_id = activity.ride_id
                rideService.insert(activity)
              }
            })
            done()
          })
      })
  })
})
