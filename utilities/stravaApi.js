const strava = require('strava-v3')
const fs = require('fs')
const path = require('path')

const mileFactor = 0.000625097671511

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
    console.log('filePath', filePath)
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
    console.log('filePath', filePath)
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
}

module.exports = StravaApiService
