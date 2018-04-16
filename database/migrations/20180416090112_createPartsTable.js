const { bikesTable, partsTable } = require('../utils')

/*
  unit: mile, km
*/

exports.up = (knex, Promise) => {
  return knex.schema.createTable(partsTable, (table) => {
    table.increments()
    table.varchar('name', 255).notNullable()
    table.integer('bike_id').notNullable()
    table.foreign('bike_id').references('id').inTable(bikesTable).onDelete('cascade')
    table.varchar('brand', 255).notNullable().defaultTo('')
    table.varchar('model', 255).notNullable().defaultTo('')
    table.integer('max_life_span').notNullable().defaultTo(100)
    table.integer('distance').notNullable().defaultTo(0)
    table.varchar('unit', 20).notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable(partsTable)
}
