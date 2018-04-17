const knex = require('../../knex')
const boom = require('boom')
const uuid = require('uuid/v4')
const {
  teamsTable
} = require('../utils')

class TeamService {
  getDefault() {
    return knex(teamsTable)
      .then((rows) => {
        if (rows.length === 1) {
          return rows[0]
        }
        throw boom.notFound(`No default team found`)
      })
      .catch((err) => {
        console.log('get: err', err)
        throw boom.badImplementation(`Error retrieving team`)
      })
  }
}

module.exports = {

}
