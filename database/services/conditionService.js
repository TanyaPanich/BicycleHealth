const knex = require('../../knex')
const boom = require('boom')
const uuid = require('uuid/v4')
const {
  ridesTable,
  conditionsTable
} = require('../utils')

class ConditionService {
  // list condition list by ride_id
  list(rideId) {
    return knex(conditionsTable)
      .where('ride_id', rideId)
      .catch((err) => {
        console.log('list: err', err)
        throw boom.badImplementation(`Error retrieving conditions by ride id, ${rideId}`)
      })
  }

  get(id) {
    return knex(conditionsTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many conditions for the id, ${id}`)
        }
        throw boom.notFound(`No conditions found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving condition with the id, ${id}`)
      })
  }

  insert(condition) {
    if (!condition.type) {
      throw boom.badRequest('Type is required')
    }
    if (!condition.condition) {
      throw boom.badRequest('Condition is required')
    }
    if (!condition.ride_id) {
      throw boom.badRequest('Ride id is required')
    }

    return knex(conditionsTable)
      .insert({
        id: uuid(),
        type: condition.type,
        ride_id: condition.ride_id,
        condition: condition.condition
      })
      .returning('*')
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many conditions for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to insert condition`)
      })
      .catch((err) => {
        console.log('insert: err', err)
        throw boom.badImplementation(`Error inserting condition for ride, ${condition.ride_id}`)
      })
  }

  update(condition) {
    if (!condition.id) {
      throw boom.badRequest('Id is required')
    }
    return knex(conditionsTable)
      .update({
        type: condition.type,
        condition: condition.condition
      })
      .where('id', condition.id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many conditions for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to update condition`)
      })
      .catch((err) => {
        console.log('update: err', err)
        throw boom.badImplementation(`Error updating condition for id, ${condition.id}`)
      })
  }

  delete(id) {
    return knex(conditionsTable)
      .del()
      .where('id', id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many conditions for the id, ${id}`)
        }
        throw boom.notFound(`No condition found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('delete: err', err)
        throw boom.badImplementation(`Error deleting condition with the id, ${id}`)
      })
  }
}

module.exports = ConditionService
