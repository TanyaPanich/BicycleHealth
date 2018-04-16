const uuid = require('uuid/v4')
const teamsTable = 'teams'
const usersTable = 'users'
const bikesTable = 'bikes'
const partsTable = 'parts'
const ridesTable = 'rides'
const repairsTable = 'repairs'
const conditionsTable = 'conditions'

const defaultTeamId = uuid()

module.exports = {
  defaultTeamId,
  teamsTable,
  usersTable,
  bikesTable,
  partsTable,
  ridesTable,
  repairsTable,
  conditionsTable
}
