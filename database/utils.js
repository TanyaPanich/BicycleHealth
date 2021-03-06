const uuid = require('uuid/v4')
const teamsTable = 'teams'
const usersTable = 'users'
const bikesTable = 'bikes'
const partsTable = 'parts'
const ridesTable = 'rides'
const repairsTable = 'repairs'
const conditionsTable = 'conditions'

let defaultTeamId = null
function initializeDefaultTeamId() {
  if (defaultTeamId === null) {
    defaultTeamId = uuid()
  }
  return defaultTeamId
}

const partsFields = [`${bikesTable}.id as bike_id`, `${bikesTable}.nick_name as bike_nick_name`,
  `${bikesTable}.type as bike_type`, `${bikesTable}.brand as bike_brand`,
  `${bikesTable}.strava_gear_id as strava_bike_id`,
  `${bikesTable}.model as bike_model`, `${bikesTable}.distance as bike_distance`,
  `${bikesTable}.distance_unit as bike_distance_unit`, `${bikesTable}.user_id as bike_user_id`,
  `${partsTable}.id as part_id`, `${partsTable}.name as part_name`,
  `${partsTable}.brand as part_brand`, `${partsTable}.model as part_model`,
  `${partsTable}.max_life_span as part_max_life_span`, `${partsTable}.distance as part_distance`,
  `${partsTable}.unit as part_unit`]

const repairsFields = [`${bikesTable}.id as bike_id`, `${bikesTable}.nick_name as bike_nick_name`,
  `${bikesTable}.type as bike_type`, `${bikesTable}.brand as bike_brand`,
  `${bikesTable}.strava_gear_id as strava_bike_id`,
  `${bikesTable}.model as bike_model`, `${bikesTable}.distance as bike_distance`,
  `${bikesTable}.distance_unit as bike_distance_unit`, `${bikesTable}.user_id as bike_user_id`,
  `${partsTable}.id as part_id`, `${partsTable}.name as part_name`,
  `${partsTable}.brand as part_brand`, `${partsTable}.model as part_model`,
  `${partsTable}.max_life_span as part_max_life_span`, `${partsTable}.distance as part_distance`,
  `${partsTable}.unit as part_unit`,
  `${repairsTable}.id as repair_id`, `${repairsTable}.type as repair_type`,
  `${repairsTable}.created_at as repair_date`]

const shortRepairsFields = [`${bikesTable}.nick_name as bike_nick_name`,
  `${partsTable}.name as part_name`,
  `${partsTable}.brand as part_brand`, `${partsTable}.model as part_model`,
  `${repairsTable}.type as repair_type`, `${repairsTable}.created_at as repair_date`]

module.exports = {
  initializeDefaultTeamId,
  teamsTable,
  usersTable,
  bikesTable,
  partsTable,
  ridesTable,
  repairsTable,
  conditionsTable,
  partsFields,
  repairsFields,
  shortRepairsFields
}
