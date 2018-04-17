const { usersTable, bikesTable } = require('../utils')

/*
  type: road_bike, mountain_bike, city_bike
  distance_unit: mile, km
*/

exports.up = (knex, Promise) => {
  return knex.schema.createTable(bikesTable, (table) => {
    table.uuid('id')
    table.varchar('nick_name', 255).notNullable()
    table.varchar('type', 20).notNullable()
    table.varchar('brand', 255).notNullable().defaultTo('')
    table.varchar('model', 255).notNullable().defaultTo('')
    table.varchar('strava_gear_id', 60).notNullable().defaultTo('')
    table.integer('distance').notNullable().defaultTo(0)
    table.varchar('distance_unit', 20).notNullable()
    table.uuid('user_id').notNullable()
    table.foreign('user_id').references('id').inTable(usersTable).onDelete('cascade')
    table.timestamps(true, true)
  })
    .then(() => {
      return knex.schema.alterTable(bikesTable, (table) => {
        table.unique('id')
      })
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(bikesTable)
}
