const uuid = require('uuid/v4')
const { bikesTable } = require('../utils')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex(bikesTable).del()
    .then(function () {
      // Inserts seed entries
      return knex(bikesTable).insert([
        {
          id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4',
          nick_name: 'The Korea bike',
          type: 'road_bike',
          brand: '',
          model: '',
          strava_gear_id: 'b4051831',
          distance: 9460414,
          distance_unit: 'mile',
          user_id: '6d33b693-6852-4efa-b28f-925d621aa453',
          created_at: new Date('2018-04-17T23:54:01.350Z'),
          updated_at: new Date('2018-04-17T23:54:01.350Z')
        },
        {
          id: 'e143c0aa-6310-4da0-abdb-3e103076e20f',
          nick_name: 'The PBP Bike #1',
          type: 'road_bike',
          brand: '',
          model: '',
          strava_gear_id: 'b4051832',
          distance: 84810,
          distance_unit: 'mile',
          user_id: '6d33b693-6852-4efa-b28f-925d621aa453',
          created_at: new Date('2018-04-17T23:54:01.351Z'),
          updated_at: new Date('2018-04-17T23:54:01.351Z')
        },
        {
          id: 'caccb810-2d7a-4824-8c70-2dfbbef89a51',
          nick_name: 'Trail Blazer',
          type: 'mountain_bike',
          brand: 'Trek',
          model: '900',
          distance: 0,
          distance_unit: 'miles',
          user_id: 'dd5af064-b1d9-49a4-a1b9-f8750d47fa11',
          created_at: new Date('2018-04-18 11:34:53.968287-06'),
          updated_at: new Date('2018-04-18 11:34:53.968287-06')
        },
        {
          id: '717ea119-4a21-4a64-abc9-1393c3267d7c',
          nick_name: 'Mountain Climber',
          type: 'mountain_bike',
          brand: 'Trek',
          model: 'MT200',
          distance: 0,
          distance_unit: 'miles',
          user_id: 'dd5af064-b1d9-49a4-a1b9-f8750d47fa11',
          created_at: new Date('2018-04-18 15:21:11.431904-06'),
          updated_at: new Date('2018-04-18 15:21:11.431904-06')
        }
      ])
    })
}
/*
[  ]
    */
