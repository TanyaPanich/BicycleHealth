'use strict'
const path = require('path')

module.exports = {
  development: {
    client: 'pg',
    migrations: {
      directory: path.join(__dirname, 'database', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'database', 'seeds_dev')
    },
    connection: 'postgres://localhost/bike_health_dev'
  },

  test: {
    client: 'pg',
    migrations: {
      directory: path.join(__dirname, 'database', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'database', 'seeds_dev')
    },
    connection: 'postgres://localhost/bike_health_test'
  },

  production: {
    client: 'pg',
    migrations: {
      directory: path.join(__dirname, 'database', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'database', 'seeds')
    },
    connection: process.env.DATABASE_URL
  }
}
