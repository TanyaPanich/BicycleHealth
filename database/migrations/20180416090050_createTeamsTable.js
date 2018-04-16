const { teamsTable } = require('../utils')

exports.up = (knex, Promise) => {
  return knex.schema.createTable(teamsTable, (table) => {
    table.uuid('id')
    table.varchar('name', 255).notNullable()
    table.timestamps(true, true)
  })
    .then(() => {
      return knex.schema.alterTable(teamsTable, (table) => {
        table.unique('id')
      })
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists(teamsTable)
}
