const knex = require('../../knex')
const boom = require('boom')
const uuid = require('uuid/v4')
const {
  usersTable,
  bikesTable,
  partsTable,
  repairsTable,
  repairsFields,
  shortRepairsFields
} = require('../utils')

class RepairService {
  // list repair list by bike_id
  listAll(bikeId) {
    return knex(bikesTable)
      .select(shortRepairsFields)
      .leftJoin(repairsTable, `${repairsTable}.bike_id`, `${bikesTable}.id`)
      .leftJoin(partsTable, `${repairsTable}.part_id`, `${partsTable}.id`)
      .where(`${bikesTable}.id`, bikeId)
      .orderBy(`repair_date`, 'desc')
      .catch((err) => {
        console.log('list: err', err)
        throw boom.badImplementation(`Error retrieving repairs by bicycle id, ${bikeId}`)
      })
  }

  // list repair list by bike_id and part_id
  list(bikeId, partId) {
    return knex(bikesTable)
      .select(repairsFields)
      .innerJoin(repairsTable, `${repairsTable}.bike_id`, `${bikesTable}.id`)
      .innerJoin(partsTable, `${repairsTable}.part_id`, `${partsTable}.id`)
      .where(`${bikesTable}.id`, bikeId)
      .andWhere(`${partsTable}.id`, partId)
      .orderBy(`${repairsTable}.created_at`).desc()
      .catch((err) => {
        console.log('list: err', err)
        throw boom.badImplementation(`Error retrieving repairs by bicycle id, ${bikeId}`)
      })
  }

  get(id) {
    return knex(repairsTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many repairs for the id, ${id}`)
        }
        throw boom.notFound(`No repairs found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving repair with the id, ${id}`)
      })
  }

  insert(repair) {
    if (!repair.type) {
      throw boom.badRequest('Type is required')
    }
    if (!repair.bike_id) {
      throw boom.badRequest('Bike id is required')
    }
    if (!repair.part_id) {
      throw boom.badRequest('Part id is required')
    }
    return knex(repairsTable)
      .insert({
        id: uuid(),
        type: repair.type,
        bike_id: repair.bike_id,
        part_id: repair.part_id
      })
      .returning('*')
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many repairs for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to insert repair`)
      })
      .catch((err) => {
        console.log('insert: err', err)
        throw boom.badImplementation(`Error inserting repair for bike ${repair.bike_id} and part ${repair.part_id}`)
      })
  }

  update(repair) {
    if (!repair.id) {
      throw boom.badRequest('Id is required')
    }
    return knex(repairsTable)
      .update({
        type: repair.type
      })
      .where('id', repair.id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many repairs for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to update repair`)
      })
      .catch((err) => {
        console.log('update: err', err)
        throw boom.badImplementation(`Error updating repair for id, ${repair.id}`)
      })
  }

  delete(id) {
    return knex(repairsTable)
      .del()
      .where('id', id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many repairs for the id, ${id}`)
        }
        throw boom.notFound(`No repair found for the id, ${id}`)
      })
      .catch((err) => {
        console.log('delete: err', err)
        throw boom.badImplementation(`Error deleting repair with the id, ${id}`)
      })
  }
}

module.exports = RepairService
