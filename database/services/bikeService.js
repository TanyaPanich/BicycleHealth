const knex = require('../../knex')
const boom = require('boom')
const uuid = require('uuid/v4')
const {
  bikesTable,
  partsTable,
  partsFields
} = require('../utils')

class BikeService {
  // list bicycle list by user_id
  list(userId) {
    if (!userId) {
      throw boom.badRequest('User id is required')
    }
    return knex(bikesTable)
      .where('user_id', userId)
      .catch((err) => {
        console.log('list: err', err)
        throw boom.badImplementation(`Error listing bicycles for the user, ${userId}`)
      })
  }

  get(id) {
    if (!id) {
      throw boom.badRequest('Id is required')
    }
    return knex(bikesTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many bicycles for the id, ${id}`)
        }
        throw boom.notFound(`No bicycle found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving bicycle with the id, ${id}`)
      })
  }

  getByStravaId(stravaId) {
    if (!stravaId) {
      throw boom.badRequest('Strava id is required')
    }
    return knex(bikesTable)
      .where('strava_gear_id', stravaId)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many bicycles for the strava_gear_id, ${stravaId}`)
        }
        throw boom.notFound(`No bicycle found for the strava_gear_id, ${stravaId}`)
      })
      .catch((err) => {
        // console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving bicycle with the strava_gear_id, ${stravaId}`)
      })
  }

  getByName(name) {
    if (!name) {
      throw boom.badRequest('Nick name is required')
    }
    return knex(bikesTable)
      .where('nick_name', name)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many bicycles for the name, ${name}`)
        }
        throw boom.notFound(`No bicycle found for the name, ${name}`)
      })
      .catch((err) => {
        console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving bicycle by the name, ${name}`)
      })
  }

  insert(bike) {
    if (!bike.nick_name) {
      throw boom.badRequest('Nick name is required')
    }
    if (!bike.type) {
      throw boom.badRequest('Bicycle type is required')
    }
    if (!bike.distance_unit) {
      throw boom.badRequest('Distance unit is required')
    }
    if (!bike.user_id) {
      throw boom.badRequest('User id is required')
    }
    return knex(bikesTable)
      .insert({
        id: uuid(),
        nick_name: bike.nick_name,
        type: bike.type,
        brand: bike.brand,
        model: bike.model,
        strava_gear_id: bike.strava_gear_id,
        distance: bike.distance,
        distance_unit: bike.distance_unit,
        user_id: bike.user_id
      })
      .returning('*')
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many bicycles for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to insert bicycle`)
      })
      .catch((err) => {
        console.log('insert: err', err)
        throw boom.badImplementation(`Error inserting bicycle for user, ${bike.user_id}`)
      })
  }

  update(bike) {
    if (!bike.id) {
      throw boom.badRequest('Id is required')
    }
    console.log('updating bike', bike);
    return knex(bikesTable)
      .where('id', bike.id)
      .update({
        nick_name: bike.nick_name,
        type: bike.type,
        brand: bike.brand,
        model: bike.model,
        strava_gear_id: bike.strava_gear_id,
        distance: bike.distance,
        distance_unit: bike.distance_unit
      })
      .returning('*')
      .then((rows) => {
        if (rows.length === 1) {
          console.log(rows);
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many bicycles for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to update bicycle`)
      })
      .catch((err) => {
        console.log('update: err', err)
        throw boom.badImplementation(`Error updating bicycle for id, ${bike.id}`)
      })
  }

  delete(id) {
    if (!id) {
      throw boom.badRequest('Id is required')
    }
    return knex(bikesTable)
      .del()
      .where('id', id)
      .returning('*')
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many bicycles for the id, ${id}`)
        }
        throw boom.notFound(`No bicycle found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('delete: err', err)
        throw boom.badImplementation(`Error deleting bicycle with the id, ${id}`)
      })
  }

  getParts(id) {
    if (!id) {
      throw boom.badRequest('Id is required')
    }
    return knex(bikesTable)
      .select(partsFields)
      .innerJoin(partsTable, `${partsTable}.bike_id`, `${bikesTable}.id`)
      .where(`${bikesTable}.id`, id)
      .catch((err) => {
        console.log('getParts: err', err)
        throw boom.badImplementation(`Error retrieving parts for bicycle with the id, ${id}`)
      })
  }

  addOrUpdate(bike) {
    return get(bike.id)
      .then((existing) => update(bike))
      .catch(() => insert(bike))
  }
}

module.exports = BikeService
