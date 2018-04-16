const { bikesTable, partsTable, repairsTable } = require('../utils')

/*
  type: repair, replace, clean
*/

exports.up = (knex, Promise) => {
  return knex.schema.createTable(repairsTable, (table) => {
    table.increments()
    table.integer('bike_id').notNullable()
    table.foreign('bike_id').references('id').inTable(bikesTable).onDelete('cascade')
    table.integer('part_id').notNullable()
    table.foreign('part_id').references('id').inTable(partsTable).onDelete('cascade')
    table.varchar('type', 20).notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable(repairsTable)
}
