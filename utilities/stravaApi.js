const strava = require('strava-v3')

class StravaApiService {
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
          const info = {
            bikes: data.bikes,
            unit: data.measurement_preference
          }
          resolve(info)
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
          const activities = data.map((activity) => {
            const info = {
              name: activity.name,
              distance: activity.distance,
              ride_id: activity.id,
              date: activity.start_date,
              bike_id: activity.gear_id
            }
            resolve(info)
          })
        }
      })
    })
  }

  collectStravaInformation(stravaId, accessToken) {
    return Promise.all([
      this.getStravaInformation(stravaId, accessToken),
      this.getStravaActivity(stravaId, accessToken)
    ])
      .then((results) => {
        results.forEach((result) => console.log('result', result))
      })
  }
}

module.exports = StravaApiService
