const { partsTable } = require('../utils')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex(partsTable).del()
    .then(() => {
      // Inserts seed entries
      return knex(partsTable).insert([
        {
          id: '5e7e90a6-8157-4ae2-877a-786efd18d068',
          name: 'Frame',
          bike_id: 'caccb810-2d7a-4824-8c70-2dfbbef89a51',
          brand: 'Seven',
          model: 'XSW',
          max_life_span: 100,
          distance: 12,
          unit: 'miles',
          created_at: new Date('2018-04-18 20:29:58.046978-06'),
          updated_at: new Date('2018-04-18 20:29:58.046978-06')
        },
        {
          id: '79c6ab6d-940f-4a79-ae05-9cdf1f361d44',
          name: 'Wheel',
          bike_id: '717ea119-4a21-4a64-abc9-1393c3267d7c',
          brand: 'Defsd',
          model: 'DW32',
          max_life_span: 200,
          distance: 2,
          unit: 'miles',
          created_at: new Date('2018-04-18 20:42:14.100545-06'),
          updated_at: new Date('2018-04-18 20:42:14.100545-06')
        },
        {
          id: '10808661-434e-450d-89f6-ae92e25bd3c2',
          name: 'Chain',
          bike_id: '717ea119-4a21-4a64-abc9-1393c3267d7c',
          brand: 'DSDW',
          model: 'DWSWS',
          max_life_span: 150,
          distance: 0,
          unit: 'miles',
          created_at: new Date('2018-04-18 20:42:45.315323-06'),
          updated_at: new Date('2018-04-18 20:42:45.315323-06')
        },
        {
          id: '7c380d8b-e2b4-4256-a539-f420380eb28d',
          name: 'Chain',
          bike_id: 'caccb810-2d7a-4824-8c70-2dfbbef89a51',
          brand: 'DSDEW',
          model: 'SW123',
          max_life_span: 200,
          distance: 0,
          unit: 'miles',
          created_at: new Date('2018-04-18 20:43:05.27532-06'),
          updated_at: new Date('2018-04-18 20:43:05.27532-06')
        }
      ])
    })
}
