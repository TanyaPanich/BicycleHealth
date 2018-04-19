const uuid = require('uuid/v4')
const { usersTable, initializeDefaultTeamId } = require('../utils')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  const userUuid1 = '82588266-1f7a-493e-bd2b-c7d3a8fa5184'
  const userUuid2 = 'bc7d4a5f-eed8-4bec-a185-48b513cce112'
  const userUuid3 = '6d33b693-6852-4efa-b28f-925d621aa453'
  const userUuid4 = 'dd5af064-b1d9-49a4-a1b9-f8750d47fa11'
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
        },
        {
          id: userUuid4,
          first_name: 'Jane',
          last_name: 'Lee',
          email: 'jane.lee@gmail.com',
          hashed_password: '$2b$08$WWIbVKK/VPbLaeyrHywCn.MgwJk43.eVNGmU4l9sQ6us3SNiPD52O',
          access_type: 'normal',
          team_id: defaultTeamId,
          created_at: new Date('2018-04-18 11:10:01.14192-06'),
          updated_at: new Date('2018-04-18 11:10:01.14192-06')
        }
      ])
    })
}
