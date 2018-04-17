process.env.NODE_ENV = 'test'

const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const knex = require('../knex')
const boom = require('boom')

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

const bikeService = new BikeService()

let defaultUserId = null
const roadster = {
  nick_name: 'Roadster',
  brand: 'Trek',
  model: 'P9000',
  type: 'road_bike',
  distance: 100,
  distance_unit: 'mile'
}
const citySlicker = {
  nick_name: 'City Slicker',
  brand: 'Trek',
  model: 'ST1000',
  type: 'city_bike',
  distance: 120,
  distance_unit: 'mile'
}
const mountainClimber = {
  nick_name: 'Mountain Climber',
  brand: 'Trek',
  model: 'P1000',
  type: 'mountain_bike',
  distance: 56,
  distance_unit: 'mile'
}

beforeEach((done) => {
  knex.migrate.rollback().then(() => {
    return knex.migrate.latest()
  }).then(() => {
    return knex.seed.run()
  }). finally(() => {
    getDefaultUser()
      .then((id) => {
        defaultUserId = id
        done()
      })
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
      roadster.user_id = defaultUserId
      insertBike(roadster)
        .then((row) => {
          assert(row.nick_name, 'Roadster', 'Roadster created')
          assert(row.user_id, defaultUserId, 'Bike added for user')
          done()
        })
        .catch((err) => {
          console.log('error1', err)
          done(err)
        })
    })
    it('list bicycles', (done) => {
      addAllBikes()
        .then(() => listBikes(defaultUserId))
        .then((bikes) => {
          assert(bikes[0].nick_name, 'Roadster', 'Roadster created')
          assert(bikes[1].nick_name, 'City Slicker', 'City Slicker created')
          assert(bikes[2].nick_name, 'Mountain Climber', 'Mountain Climber created')
          done()
        })
    })
    it('delete bike', (done) => {
      addAllBikes()
        .then(() => listBikes(defaultUserId))
        .then((bikes) => {
          assert.isAbove(bikes.length, 0, 'There are bicycles')
          if (bikes.length > 0) {
            return bikes[0].id
          }
          throw boom.notFound()
        })
        .then((bikeId) => deleteBike(bikeId))
        .then(() => listBikes(defaultUserId))
        .then((bikes) => {
          assert.isAbove(bikes.length, 0, 'There are bicycles')
          assert(bikes[0].nick_name, 'City Slicker', 'City Slicker created')
          assert(bikes[1].nick_name, 'Mountain Climber', 'Mountain Climber created')
          done()
        })
        .catch((err) => {
          console.log('error1', err)
          done(err)
        })
    })
  })
})

function getDefaultUser() {
  return knex(usersTable)
    .then((rows) => {
      if (rows.length > 0) {
        return rows[0].id
      }
    })
}

function insertBike(newBike) {
  return bikeService.insert(newBike)
}

function listBikes(userId) {
  return bikeService.list(userId)
}

function addAllBikes() {
  roadster.user_id = defaultUserId
  citySlicker.user_id = defaultUserId
  mountainClimber.user_id = defaultUserId
  return Promise.all([
    insertBike(roadster),
    insertBike(citySlicker),
    insertBike(mountainClimber)
  ])
}

function deleteBike(id) {
  return bikeService.delete(id)
}
