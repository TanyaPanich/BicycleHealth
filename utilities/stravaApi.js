const strava = require('strava-v3')
const fs = require('fs')
const path = require('path')

class StravaApiService {
  convertActivity(activity) {
    const info = {
      name: activity.name,
      distance: activity.distance,
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
      distance: bike.distance,
      distance_unit: (unit === 'feet') ? 'mile' : 'km'
    }
    return info
  }

  getStravaInformation(stravaId, accessToken) {
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
          const bikes = data.bikes.map((bike) => this.convertBike(bike, data.measurement_preference))
          resolve({
            bikes: bikes,
            unit: data.measurement_preference
          })
        }
      })
    })
  }

  getStravaActivity(stravaId, accessToken) {
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
          const activities = data.map((activity) => this.convertActivity(activity))
          resolve({ activities: activities })
        }
      })
    })
  }

  collectStravaInformation(stravaId, accessToken) {
    return Promise.all([
      this.getStravaInformation(stravaId, accessToken),
      this.getStravaActivity(stravaId, accessToken)
    ])
  }

  getStravaInformationInFile(filename) {
    const filePath = path.join(__dirname, '..', 'strava', 'data', filename)
    console.log('filePath', filePath)
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        }
        else {
          const json = JSON.parse(data)
          const bikes = json.bikes.map((bike) => this.convertBike(bike, json.measurement_preference))
          resolve({
            bikes: bikes,
            email: json.email,
            unit: json.measurement_preference
          })
        }
      })
    })
  }

  getStravaActivityInFile(filename) {
    const filePath = path.join(__dirname, '..', 'strava', 'data', filename)
    console.log('filePath', filePath)
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        }
        else {
          const activities = JSON.parse(data).map((activity) => this.convertActivity(activity))
          resolve({ activities: activities })
        }
      })
    })
  }

  collectStravaInFile() {
    return Promise.all([
      this.getStravaInformationInFile('athlete.json'),
      this.getStravaActivityInFile('activities.json')
    ])
  }
}

module.exports = StravaApiService
