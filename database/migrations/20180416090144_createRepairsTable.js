const { bikesTable, partsTable, repairsTable } = require('../utils')

/*
  type: repair, replace, clean
*/

exports.up = (knex, Promise) => {
  return knex.schema.createTable(repairsTable, (table) => {
    table.uuid('id')
    table.uuid('bike_id').notNullable()
    table.foreign('bike_id').references('id').inTable(bikesTable).onDelete('cascade')
    table.uuid('part_id').notNullable()
    table.foreign('part_id').references('id').inTable(partsTable).onDelete('cascade')
    table.varchar('type', 20).notNullable()
    table.timestamps(true, true)
  })
    .then(() => {
      return knex.schema.alterTable(repairsTable, (table) => {
        table.unique('id')
      })
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(repairsTable)
}
