const knex = require('../../knex')
const boom = require('boom')
const uuid = require('uuid/v4')
const {
  usersTable,
  bikesTable,
  partsTable,
  ridesTable,
  repairsTable,
  conditionsTable
} = require('../utils')

class RideService {
  // list ride list by bike_id
  list(bikeId) {
    if (!bikeId) {
      throw boom.badRequest('Bike id is required')
    }
    return knex(ridesTable)
      .where('bike_id', bikeId)
      .catch((err) => {
        console.log('list: err', err)
        throw boom.badImplementation(`Error retrieving rides by bicycle id, ${bikeId}`)
      })
  }

  get(id) {
    if (!id) {
      throw boom.badRequest('Id is required')
    }
    return knex(ridesTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many rides for the id, ${id}`)
        }
        throw boom.notFound(`No rides found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving ride with the id, ${id}`)
      })
  }

  getByStravaId(stravaId) {
    if (!stravaId) {
      throw boom.badRequest('Strava id is required')
    }
    return knex(ridesTable)
      .where('strava_ride_id', stravaId)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many rides for the strava id, ${stravaId}`)
        }
        throw boom.notFound(`No rides found for the strava id, ${stravaId}`)
      })
      .catch((err) => {
        // console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving ride with the strava id, ${stravaId}`)
      })
  }

  insert(ride) {
    if (!ride.bike_id) {
      throw boom.badRequest('Bike id is required')
    }
    if (!ride.distance_unit) {
      throw boom.badRequest('Distance unit is required')
    }
    return knex(ridesTable)
      .insert({
        id: uuid(),
        name: ride.name,
        strava_ride_id: ride.strava_ride_id,
        bike_id: ride.bike_id,
        rode_at: ride.rode_at,
        distance: ride.distance,
        distance_unit: ride.distance_unit
      })
      .returning('*')
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many rides for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to insert ride`)
      })
      .catch((err) => {
        console.log('insert: err', err)
        throw boom.badImplementation(`Error inserting ride for bike, ${ride.bike_id}`)
      })
  }

  update(ride) {
    if (!ride.id) {
      throw boom.badRequest('Id is required')
    }
    return knex(ridesTable)
      .update({
        name: ride.name,
        strava_ride_id: ride.strava_ride_id,
        rode_at: ride.rode_at,
        distance: ride.distance,
        distance_unit: ride.distance_unit
      })
      .returning('*')
      .where('id', ride.id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many rides for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to update ride`)
      })
      .catch((err) => {
        console.log('update: err', err)
        throw boom.badImplementation(`Error updating ride for id, ${ride.id}`)
      })
  }

  delete(id) {
    if (!id) {
      throw boom.badRequest('Id is required')
    }
    return knex(ridesTable)
      .del()
      .where('id', id)
      .returning('*')
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many rides for the id, ${id}`)
        }
        throw boom.notFound(`No ride found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('delete: err', err)
        throw boom.badImplementation(`Error deleting ride with the id, ${id}`)
      })
  }

  addOrUpdate(ride) {
    return get(ride.id)
      .then((existing) => update(ride))
      .catch(() => insert(ride))
  }
}

module.exports = RideService
