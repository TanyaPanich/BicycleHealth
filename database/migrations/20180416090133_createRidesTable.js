const { bikesTable, ridesTable } = require('../utils')

/*
  distance_unit: mile, km
*/

exports.up = (knex, Promise) => {
  return knex.schema.createTable(ridesTable, (table) => {
    table.uuid('id')
    table.varchar('name', 255).notNullable().defaultTo('')
    table.varchar('strava_ride_id', 255).notNullable().defaultTo('')
    table.dateTime('rode_at').notNullable().defaultTo(knex.raw('now()'))
    table.integer('distance').notNullable().defaultTo(0)
    table.varchar('distance_unit', 20).notNullable()
    table.uuid('bike_id').notNullable()
    table.foreign('bike_id').references('id').inTable(bikesTable).onDelete('cascade')
    table.timestamps(true, true)
  })
    .then(() => {
      return knex.schema.alterTable(ridesTable, (table) => {
        table.unique('id')
      })
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(ridesTable)
}
