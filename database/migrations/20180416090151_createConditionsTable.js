const { conditionsTable, ridesTable } = require('../utils')

/*
  type: weather, road
  condition for weather: sunny, rain, snow
  condition for road: dry, wet, icy
*/

exports.up = (knex, Promise) => {
  return knex.schema.createTable(conditionsTable, (table) => {
    table.increments()
    table.varchar('type', 20).notNullable()
    table.varchar('condition', 20).notNullable()
    table.integer('ride_id').notNullable()
    table.foreign('ride_id').references('id').inTable(ridesTable).onDelete('cascade')
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable(conditionsTable)
}
