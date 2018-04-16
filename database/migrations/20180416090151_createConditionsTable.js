const { conditionsTable, ridesTable } = require('../utils')

/*
  type: weather, road
  condition for weather: sunny, rain, snow
  condition for road: dry, wet, icy
*/

exports.up = (knex, Promise) => {
  return knex.schema.createTable(conditionsTable, (table) => {
    table.uuid('id')
    table.varchar('type', 20).notNullable()
    table.varchar('condition', 20).notNullable()
    table.uuid('ride_id').notNullable()
    table.foreign('ride_id').references('id').inTable(ridesTable).onDelete('cascade')
    table.timestamps(true, true)
  })
    .then(() => {
      return knex.schema.alterTable(conditionsTable, (table) => {
        table.unique('id')
      })
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(conditionsTable)
}
