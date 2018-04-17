process.env.NODE_ENV = 'test'

const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const knex = require('../knex')
const boom = require('boom')

const {
  initializeDefaultTeamId,
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
const RepairService = require('../database/services/repairService')
const UserService = require('../database/services/userService')

const bikeService = new BikeService()
const repairService = new RepairService()
const userService = new UserService()

let defaultUserId = null
let defaultTeamId = null

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
        defaultTeamId = initializeDefaultTeamId()
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

describe('database service check', () => {
  describe('user table check', () => {
    it('add Jane Doe', (done) => {
      const user = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@email.com',
        team_id: defaultTeamId,
        access_type: 'strava',
        strava_user_id: 'jane.doe',
        strava_access_token: 'ABCDEFD'
      }
      userService.insert(user)
        .then((row) => {
          assert(row.first_name, 'Jane', 'First name of new user is Jane')
          assert(row.last_name, 'Doe', 'Last name of new user is Doe')
          assert(row.email, 'jane.doe@email.com', 'Email of new user is jane.doe@email.com')
          done()
        })
    })
  })
  describe('bike table check', () => {
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
  describe('part table check', () => {

  })
  describe('ride table check', () => {

  })
  describe('condition table check', () => {

  })
  describe('repair table check', () => {
    it('list repair history for a bike', (done) => {
      addAllBikes()
        .then(() => listBikes(defaultUserId))
        .then((bikes) => {
          assert.isAbove(bikes.length, 0, 'There are bicycles')
          if (bikes.length > 0) {
            return bikes[0].id
          }
          throw boom.notFound()
        })
        .then((bikeId) => repairService.listAll(bikeId))
        .then((repairs) => {
          assert.strictEqual(repairs.length, 0, 'No repair history')
          done()
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
