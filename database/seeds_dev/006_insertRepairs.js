const uuid = require('uuid/v4')
const { repairsTable } = require('../utils')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex(repairsTable).del()
    .then(() => {
      // Inserts seed entries
      return knex(repairsTable).insert([
        {
          id: uuid(),
          bike_id: 'caccb810-2d7a-4824-8c70-2dfbbef89a51',
          part_id: '5e7e90a6-8157-4ae2-877a-786efd18d068',
          type: 'replace',
          created_at: new Date('2017-04-16 15:26:16 UTC'),
          updated_at: new Date('2017-04-16 15:26:16 UTC')
        },
        {
          id: uuid(),
          bike_id: 'caccb810-2d7a-4824-8c70-2dfbbef89a51',
          part_id: '7c380d8b-e2b4-4256-a539-f420380eb28d',
          type: 'replace',
          created_at: new Date('2016-04-16 15:26:16 UTC'),
          updated_at: new Date('2016-04-16 15:26:16 UTC')
        },
        {
          id: uuid(),
          bike_id: 'caccb810-2d7a-4824-8c70-2dfbbef89a51',
          part_id: '5e7e90a6-8157-4ae2-877a-786efd18d068',
          type: 'clean',
          created_at: new Date('2018-03-16 15:26:16 UTC'),
          updated_at: new Date('2018-03-16 15:26:16 UTC')
        },
        {
          id: uuid(),
          bike_id: 'caccb810-2d7a-4824-8c70-2dfbbef89a51',
          part_id: '7c380d8b-e2b4-4256-a539-f420380eb28d',
          type: 'clean',
          created_at: new Date('2018-03-16 15:26:16 UTC'),
          updated_at: new Date('2018-03-16 15:26:16 UTC')
        },
        {
          id: uuid(),
          bike_id: '717ea119-4a21-4a64-abc9-1393c3267d7c',
          part_id: '79c6ab6d-940f-4a79-ae05-9cdf1f361d44',
          type: 'replace',
          created_at: new Date('2017-04-16 15:26:16 UTC'),
          updated_at: new Date('2017-04-16 15:26:16 UTC')
        },
        {
          id: uuid(),
          bike_id: '717ea119-4a21-4a64-abc9-1393c3267d7c',
          part_id: '10808661-434e-450d-89f6-ae92e25bd3c2',
          type: 'replace',
          created_at: new Date('2018-01-16 15:26:16 UTC'),
          updated_at: new Date('2018-01-16 15:26:16 UTC')
        },
        {
          id: uuid(),
          bike_id: '717ea119-4a21-4a64-abc9-1393c3267d7c',
          part_id: '79c6ab6d-940f-4a79-ae05-9cdf1f361d44',
          type: 'clean',
          created_at: new Date('2018-03-16 15:26:16 UTC'),
          updated_at: new Date('2018-03-16 15:26:16 UTC')
        },
        {
          id: uuid(),
          bike_id: '717ea119-4a21-4a64-abc9-1393c3267d7c',
          part_id: '10808661-434e-450d-89f6-ae92e25bd3c2',
          type: 'clean',
          created_at: new Date('2018-02-16 15:26:16 UTC'),
          updated_at: new Date('2018-02-16 15:26:16 UTC')
        },
        {
          id: uuid(),
          bike_id: '717ea119-4a21-4a64-abc9-1393c3267d7c',
          part_id: '79c6ab6d-940f-4a79-ae05-9cdf1f361d44',
          type: 'repair',
          created_at: new Date('2017-12-16 15:26:16 UTC'),
          updated_at: new Date('2017-12-16 15:26:16 UTC')
        },
        {
          id: uuid(),
          bike_id: '717ea119-4a21-4a64-abc9-1393c3267d7c',
          part_id: '10808661-434e-450d-89f6-ae92e25bd3c2',
          type: 'repair',
          created_at: new Date('2017-10-16 15:26:16 UTC'),
          updated_at: new Date('2017-10-16 15:26:16 UTC')
        }
      ])
    })
}
