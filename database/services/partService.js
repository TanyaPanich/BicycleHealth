const knex = require('../../knex')
const boom = require('boom')
const uuid = require('uuid/v4')
const {
  usersTable,
  bikesTable,
  partsTable,
  ridesTable,
  repairsTable,
  conditionsTable,
  partsFields
} = require('../utils')

class PartService {
  list(bikeId) {
    return knex(partsTable)
      .where('bike_id', id)
      .catch((err) => {
        console.log('list: err', err)
        throw boom.badImplementation(`Error retrieving parts by bicycle id, ${id}`)
      })
  }

  get(id) {
    return knex(partsTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length === 0) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many parts for the id, ${id}`)
        }
        throw boom.notFound(`No parts found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving part with the id, ${id}`)
      })
  }

  insert(part) {
    if (!part.name) {
      throw boom.badRequest('Name is required')
    }
    if (!part.bike_id) {
      throw boom.badRequest('Bike id is required')
    }
    if (!part.unit) {
      throw boom.badRequest('Unit is required')
    }
    return knex(partsTable)
      .insert({
        id: uuid(),
        name: part.name,
        bike_id: part.bike_id,
        brand: part.brand,
        model: part.model,
        max_life_span: part.max_life_span,
        distance: part.distance,
        unit: part.unit
      })
      .returning('*')
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many parts for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to insert part`)
      })
      .catch((err) => {
        console.log('insert: err', err)
        throw boom.badImplementation(`Error inserting part for bike, ${part.bike_id}`)
      })
  }

  update(part) {
    if (!part.id) {
      throw boom.badRequest('Id is required')
    }
    return knex(partsTable)
      .update({
        name: part.name,
        brand: part.brand,
        model: part.model,
        max_life_span: part.max_life_span,
        distance: part.distance,
        unit: part.unit
      })
      .where('id', part.id)
      .then((rows) => {
        if (rows.length === 0) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many parts for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to update part`)
      })
      .catch((err) => {
        console.log('update: err', err)
        throw boom.badImplementation(`Error updating part for id, ${part.id}`)
      })
  }

  delete(id) {
    return knex(partsTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many parts for the id, ${id}`)
        }
        throw boom.notFound(`No part found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('delete: err', err)
        throw boom.badImplementation(`Error deleting part with the id, ${id}`)
      })
  }
}

module.exports = PartService
