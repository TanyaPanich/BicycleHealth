const uuid = require('uuid/v4')
const { usersTable, initializeDefaultTeamId } = require('../utils')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  const userUuid1 = uuid()
  const userUuid2 = uuid()
  const userUuid3 = uuid()
  const defaultTeamId = initializeDefaultTeamId()
  return knex(usersTable).del()
    .then(() => {
      // Inserts seed entries
      return knex(usersTable).insert([
        {
          id: userUuid1,
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane.doe@abc.com',
          access_type: 'normal',
          team_id: defaultTeamId,
          created_at: new Date('2018-04-16 15:26:16 UTC'),
          updated_at: new Date('2018-04-16 15:26:16 UTC')
        },
        {
          id: userUuid2,
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@abc.com',
          access_type: 'normal',
          team_id: defaultTeamId,
          created_at: new Date('2018-04-16 15:26:16 UTC'),
          updated_at: new Date('2018-04-16 15:26:16 UTC')
        },
        {
          id: userUuid3,
          first_name: 'Pascal',
          last_name: 'Ledru',
          email: 'pascal.ledru@gmail.com',
          access_type: 'strava',
          team_id: defaultTeamId,
          created_at: new Date('2018-04-16 15:26:16 UTC'),
          updated_at: new Date('2018-04-16 15:26:16 UTC')
        }
      ])
    })
}
