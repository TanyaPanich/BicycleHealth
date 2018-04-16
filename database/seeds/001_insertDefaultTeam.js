const { teamsTable } = require('../utils')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex(teamsTable).del()
    .then(() => {
      // Inserts seed entries
      return knex(teamsTable).insert([
        {
          id: 1,
          name: 'Default',
          created_at: new Date('2018-04-16 14:26:16 UTC'),
          updated_at: new Date('2018-04-16 14:26:16 UTC')
        }
      ])
        .then(() => {
          return knex.raw(`SELECT setval('teams_id_seq', (SELECT MAX(id) FROM teams));`)
        })
    })
}
