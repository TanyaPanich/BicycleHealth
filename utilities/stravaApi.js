const strava = require('strava-v3')
const fs = require('fs')
const path = require('path')
const BikeService = require('../database/services/bikeService')
const RideService = require('../database/services/rideService')
const UserService = require('../database/services/userService')

const mileFactor = 0.000625097671511
const bikeService = new BikeService()
const rideService = new RideService()
const userService = new UserService()

class StravaApiService {
  convertActivity(activity, unit) {
    const info = {
      name: activity.name,
      distance: (unit === 'feet') ? (activity.distance * mileFactor) : (activity.distance * 0.001),
      ride_id: activity.id,
      date: activity.start_date,
      bike_id: activity.gear_id
    }
    return info
  }

  convertBike(bike, unit) {
    const info = {
      nick_name: bike.name,
      type: 'road_bike',
      strava_gear_id: bike.id,
      distance: (unit === 'feet') ? (bike.distance * mileFactor) : (bike.distance * 0.001),
      distance_unit: (unit === 'feet') ? 'mile' : 'km'
    }
    return info
  }

  getStravaInformation(stravaId, accessToken, unit) {
    const stravaConfig = {
      access_token: accessToken,
      id: stravaId
    }
    return new Promise((resolve, reject) => {
      strava.athlete.get(stravaConfig, (error, data) => {
        if (error) {
          reject(error)
        }
        else {
          const bikes = data.bikes.map((bike) => this.convertBike(bike, data.measurement_preference || unit))
          resolve({
            bikes: bikes,
            email: data.email,
            unit: data.measurement_preference
          })
        }
      })
    })
  }

  getStravaActivity(stravaId, accessToken, unit = 'feet') {
    const stravaConfig = {
      access_token: accessToken,
      per_page: 50,
      type: 'Ride',
      id: stravaId
    }
    return new Promise((resolve, reject) => {
      strava.athlete.listActivities(stravaConfig, (error, data, limits) => {
        if (error) {
          reject(error)
        }
        else {
          const activities = data.map((activity) => this.convertActivity(activity, unit))
          resolve({ activities: activities })
        }
      })
    })
  }

  collectStravaInformation(stravaId, accessToken, unit = 'feet') {
    return Promise.all([
      this.getStravaInformation(stravaId, accessToken, unit),
      this.getStravaActivity(stravaId, accessToken, unit)
    ])
  }

  getStravaInformationInFile(filename, unit) {
    const filePath = path.join(__dirname, '..', 'strava', 'data', filename)
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        }
        else {
          const json = JSON.parse(data)
          const bikes = json.bikes.map((bike) => this.convertBike(bike, json.measurement_preference || unit))
          resolve({
            bikes: bikes,
            email: json.email,
            unit: json.measurement_preference
          })
        }
      })
    })
  }

  getStravaActivityInFile(filename, unit) {
    const filePath = path.join(__dirname, '..', 'strava', 'data', filename)
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        }
        else {
          const activities = JSON.parse(data).map((activity) => this.convertActivity(activity, unit))
          resolve({ activities: activities })
        }
      })
    })
  }

  collectStravaInFile(unit = 'feet') {
    return Promise.all([
      this.getStravaInformationInFile('athlete.json', unit),
      this.getStravaActivityInFile('activities.json', unit)
    ])
  }

  findBikeByStravaId(stravaId) {
    return bikeService
      .getByStravaId(stravaId)
      .then((bikeInDB) => bikeInDB)
      .catch((err) => null)
  }

  assignBikeToUser(bikes, bikesInDatabase, userId) {
    if (!bikes || !bikesInDatabase) {
      return null
    }
    return bikesInDatabase.map((bike, index) => {
      if (!bike) {
        const newBike = bikes[index]
        newBike.user_id = userId
        return bikeService.insert(newBike)
      }
      else {
        return bike
      }
    })
  }

  findActivitiesForBike(activities, bikesInDatabase) {
    return activities
      .reduce((acc, activity) => {
        const foundBikes = bikesInDatabase.filter((bike) => bike.strava_gear_id === activity.bike_id)
        if (foundBikes.length > 0) {
          activity.bike_id = foundBikes[0].id
          acc.push(activity)
        }
        return acc
      }, [])
  }

  addNewActivities(activityInDB, unit) {
    return activityInDB.map((activity) => rideService
      .getByStravaId(activity.ride_id)
      .then((inDb) => null)
      .catch((err) => {
        activity.distance_unit = unit
        activity.strava_ride_id = activity.ride_id
        return rideService.insert(activity)
      }))
  }

  populateDatabase(stravaUserId, stravaAccessToken) {
    return this.collectStravaInformation(stravaUserId, stravaAccessToken)
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
            bikes.map((bike) => this.findBikeByStravaId(bike.strava_gear_id))
          )
            .then((results) => {
              data.bikesInDatabase = results
              return data
            })
        }
        else {
          return data
        }
      })
      .then((data) => {
        const { bikes, unit, email, activities, user, bikesInDatabase } = data
        if (user) {
          return Promise.all(this.assignBikeToUser(bikes, bikesInDatabase, user.id))
            .then((what) => {
              data.bikesInDatabase = what
              return data
            })
        }
        else {
          return data
        }
      })
      .then((data) => {
        const { bikes, unit, activities, bikesInDatabase } = data
        return Promise.all(this.findActivitiesForBike(activities, bikesInDatabase))
          .then((activityInDB) => {
            data.activityInDB = activityInDB
            return data
          })
      })
      .then((data) => {
        const { unit, activityInDB } = data
        return Promise.all(this.addNewActivities(activityInDB, unit))
      })
  }
}

module.exports = StravaApiService
