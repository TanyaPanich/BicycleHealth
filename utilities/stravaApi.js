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
          console.log(data)
          resolve(data)
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
      strava.athlete.listActivities(stravaConfig, (error, activities, limits) => {
        if (error) {
          reject(error)
        }
        else {
          console.log(activities)
          resolve(activities)
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

      })
  }
}

module.exports = StravaApiService
