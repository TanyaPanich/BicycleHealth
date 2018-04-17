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

describe('database service check', () => {
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
        console.log(bikesInDatabase, unit)

        return Promise.all(
          activities.map((activity) => rideService
            .getByStravaId(bike.strava_gear_id)
            .then((bikeInDB) => bikeInDB)
            .catch((err) => null))
        )
          .then((results) => {
            data.bikesInDatabase = results
            return data
          })


      })
  })
})


/*
return bikeService.getByStravaId(bike.strava_gear_id)
  .then((record) => {
    return record
  })
  .catch((err) => {
    bike.user_id = user.id
    return bikeService.insert(bike)
  })
  .then((existing) => {
    console.log(existing)
  })
const rides = activities.filter((activity) => activity.bike_id === bike.strava_gear_id)
console.log(rides)
*/
