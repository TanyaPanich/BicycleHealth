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

class UserService {
  getByEmail(email) {
    return knex(usersTable)
      .where('email', email)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many users for the email, ${email}`)
        }
        throw boom.notFound(`Unable to get user by ${email}`)
      })
      .catch((err) => {
        throw boom.badImplementation(`Error retrieving user by ${email}`)
      })
  }

  get(id) {
    return knex(usersTable)
      .where('id', id)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many users for the id, ${id}`)
        }
        throw boom.notFound(`Unable to get user by ${id}`)
      })
      .catch((err) => {
        throw boom.badImplementation(`Error retrieving user by ${id}`)
      })
  }

  insert(user) {
    if (!user.email) {
      throw boom.badRequest('Email must not be blank')
    }
    if (!user.team_id) {
      throw boom.badRequest('Team id is required')
    }

    return knex(usersTable)
      .returning('*')
      .insert({
        id: uuid(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        hashed_password: user.hashed_password,
        strava_user_id: user.strava_user_id,
        strava_access_token: user.strava_access_token,
        access_type: user.access_type,
        team_id: user.team_id
      })
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many users for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to insert user`)
      })
      .catch((err) => {
        console.log('insert: err', err)
        throw boom.badImplementation(`Error inserting user`)
      })
  }

  update(user) {
    if (!user.email) {
      throw boom.badRequest('Email must not be blank')
    }
    if (!user.team_id) {
      throw boom.badRequest('Team id is required')
    }

    return knex(usersTable)
      .returning('*')
      .update({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        hashed_password: user.hashed_password,
        strava_user_id: user.strava_user_id,
        strava_access_token: user.strava_access_token,
        access_type: user.access_type
      })
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        if (rows.length > 1) {
          throw boom.badImplementation(`Too many users for the id, ${rows[0].id}`)
        }
        throw boom.badImplementation(`Unable to update user`)
      })
      .catch((err) => {
        console.log('update: err', err)
        throw boom.badImplementation(`Error updating user`)
      })
  }
}

module.exports = UserService
