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
  // list part list by bike_id
  list(bikeId) {
    return knex(partsTable)
      .where('bike_id', bikeId)
      .catch((err) => {
        //console.log('list: err', err)
        throw boom.badImplementation(`Error retrieving parts by bicycle id, ${bikeId}`)
      })
  }

  addIfNotExist(part) {
    if (part.name && part.bike_id) {
      return this.getByName(part.name, part.bike_id)
        .then((existing) => {
          return null
        })
        .catch((err) => {
          return this.insert(part)
        })
        .then((existing) => {
          if (!existing) {
            throw boom.badRequest('Part already exists')
          }
          else {
            return existing
          }
        })
    }
    throw boom.badRequest('Part name and bike id are required')
  }

  get(id) {
    return knex(partsTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many parts for the id, ${id}`)
        }
        throw boom.notFound(`No parts found for the id, ${id}`)
      })
      .catch((err) => {
        //console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving part with the id, ${id}`)
      })
  }

  getByName(name, bikeId) {
    return knex(partsTable)
      .where('name', name)
      .andWhere('bike_id', bikeId)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many parts for the name, ${name}`)
        }
        throw boom.notFound(`No parts found for the name, ${name}`)
      })
      .catch((err) => {
      //  console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving part with the name, ${name}`)
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
      .where('id', part.id)
      .update({
        name: part.name,
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
        throw boom.badImplementation(`Unable to update part`)
      })
      .catch((err) => {
        console.log('update: err', err)
        throw boom.badImplementation(`Error updating part for id, ${part.id}`)
      })
  }

  delete(id) {
    return knex(partsTable)
      .del()
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
