const { teamsTable, usersTable } = require('../utils')

/*
  access_type: 'normal' or 'strava'
  team_id: default team named 'Default' is created using a seed file.
*/

exports.up = (knex, Promise) => {
  return knex.schema.createTable(usersTable, (table) => {
    table.increments()
    table.varchar('first_name', 255).notNullable()
    table.varchar('last_name', 255).notNullable()
    table.varchar('email', 255).notNullable()
    table.specificType('hashed_password', 'CHAR(60)').defaultTo('')
    table.varchar('strava_user_id', 60).notNullable().defaultTo('')
    table.varchar('strava_access_token', 255).notNullable().defaultTo('')
    table.varchar('access_type', 20).notNullable()
    table.integer('team_id').notNullable()
    table.foreign('team_id').references('id').inTable(teamsTable).onDelete('cascade')
    table.timestamps(true, true)
  })
    .then(() => {
      return knex.schema.alterTable(usersTable, (table) => {
        table.unique('email')
      })
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable(usersTable)
}
