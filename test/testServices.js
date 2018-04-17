process.env.NODE_ENV = 'test'

const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const knex = require('../knex')

const {
  defaultTeamId,
  teamsTable,
  usersTable,
  bikesTable,
  partsTable,
  ridesTable,
  repairsTable,
  conditionsTable
} = require('../database/utils')

const BikeService = require('../database/services/bikeService')
const TeamService = require('../database/services/teamService')

beforeEach((done) => {
  knex.migrate.rollback().then(() => {
    return knex.migrate.latest()
  }).then(() => {
    return knex.seed.run()
  }). finally(() => {
    done()
  })
})

afterEach((done) => {
  knex.migrate.rollback(). finally(() => {
    done()
  })
})

after(() => {
  knex.destroy()
})

describe('bikes table check', () => {
  describe('insert bike', () => {
    it('add roadster', (done) => {
      knex(usersTable)
        .then((rows) => {
          if (rows.length > 0) {
            return rows[0].id
          }
        })
        .then((userId) => {
          if (userId !== null) {
            const bikeService = new BikeService()
            const newBike = {
              nick_name: 'Roadster',
              brand: 'Trek',
              model: 'P9000',
              type: 'road_bike',
              user_id: userId,
              distance: 100,
              distance_unit: 'mile'
            }
            bikeService.insert(newBike)
              .then((row) => {
                assert(row.nick_name, 'Roadster', 'Roadster created')
                assert(row.user_id, userId, 'Bike added for user')
                done()
              })
              .catch((err) => {
                console.log('error1', err)
                done(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
          done(err)
        })
    })
  })
})
