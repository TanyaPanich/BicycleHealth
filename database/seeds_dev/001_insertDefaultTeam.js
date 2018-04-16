const { teamsTable, defaultTeamId } = require('../utils')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex(teamsTable).del()
    .then(() => {
      // Inserts seed entries
      return knex(teamsTable).insert([
        {
          id: defaultTeamId,
          name: 'Default',
          created_at: new Date('2018-04-16 14:26:16 UTC'),
          updated_at: new Date('2018-04-16 14:26:16 UTC')
        }
      ])
    })
}
