const { teamsTable } = require('../utils')

exports.up = (knex, Promise) => {
  return knex.schema.createTable(teamsTable, (table) => {
    table.increments()
    table.varchar('name', 255).notNullable()
    table.timestamps(true, true)
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable(teamsTable)
}
