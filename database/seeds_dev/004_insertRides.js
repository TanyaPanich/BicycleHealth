const uuid = require('uuid/v4')
const { ridesTable } = require('../utils')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex(ridesTable).del().then(() => {
    // Inserts seed entries
    return knex(ridesTable).insert([
      {
        id: uuid(),
        name: 'Afternoon Ride',
        distance: 11.86154086575698,
        distance_unit: 'mile',
        strava_ride_id: 1461586081,
        rode_at: new Date('2018-03-19T21:41:33Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Morning Ride',
        distance: 13.070604781993557,
        distance_unit: 'mile',
        strava_ride_id: 1460924220,
        rode_at: new Date('2018-03-19T14:10:13Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'RMCC - Carter Lake - Campion',
        distance: 70.12908266914758,
        distance_unit: 'mile',
        strava_ride_id: 1460195256,
        rode_at: new Date('2018-03-18T16:58:37Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Lunch Ride',
        distance: 40.35480543833854,
        distance_unit: 'mile',
        strava_ride_id: 1458054298,
        rode_at: new Date('2018-03-17T17:25:44Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Afternoon Ride',
        distance: 11.85010157836833,
        distance_unit: 'mile',
        strava_ride_id: 1456567046,
        rode_at: new Date('2018-03-16T22:20:55Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Morning Ride',
        distance: 12.657852789494845,
        distance_unit: 'mile',
        strava_ride_id: 1455958651,
        rode_at: new Date('2018-03-16T14:28:54Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Afternoon Ride',
        distance: 20.204656977647147,
        distance_unit: 'mile',
        strava_ride_id: 1453645496,
        rode_at: '2018-03-14T23:04:32Z',
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'RMCC Boulder Climbing',
        distance: 65.79340521954728,
        distance_unit: 'mile',
        strava_ride_id: 1446397238,
        rode_at: new Date('2018-03-10T16:16:49Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Afternoon Ride',
        distance: 12.384747616811689,
        distance_unit: 'mile',
        strava_ride_id: 1444498997,
        rode_at: new Date('2018-03-09T20:52:05Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Morning Ride',
        distance: 14.130270354739006,
        distance_unit: 'mile',
        strava_ride_id: 1444020683,
        rode_at: new Date('2018-03-09T14:41:07Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Mountain biking',
        distance: 16.660853258316987,
        distance_unit: 'mile',
        strava_ride_id: 1442805614,
        rode_at: new Date('2018-03-08T18:00:47Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Lunch Ride',
        distance: 27.37015158617774,
        distance_unit: 'mile',
        strava_ride_id: 1441409672,
        rode_at: new Date('2018-03-07T19:02:34Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Afternoon Ride',
        distance: 14.794624160020897,
        distance_unit: 'mile',
        strava_ride_id: 1439814128,
        rode_at: new Date('2018-03-06T20:38:59Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Morning Ride',
        distance: 13.52998906078699,
        distance_unit: 'mile',
        strava_ride_id: 1439149587,
        rode_at: new Date('2018-03-06T14:23:18Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Gravel torture',
        distance: 83.07923112984098,
        distance_unit: 'mile',
        strava_ride_id: 1434903053,
        rode_at: new Date('2018-03-03T15:16:24Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Gravel tuning ',
        distance: 23.415158618527645,
        distance_unit: 'mile',
        strava_ride_id: 1432968676,
        rode_at: new Date('2018-03-02T18:05:33Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Gravel testing',
        distance: 22.91558055945605,
        distance_unit: 'mile',
        strava_ride_id: 1431448271,
        rode_at: new Date('2018-03-01T14:33:17Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Afternoon Ride',
        distance: 12.53539615564584,
        distance_unit: 'mile',
        strava_ride_id: 1429232209,
        rode_at: new Date('2018-02-27T22:42:18Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Morning Ride',
        distance: 12.013252070632701,
        distance_unit: 'mile',
        strava_ride_id: 1428512279,
        rode_at: new Date('2018-02-27T14:25:41Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Afternoon Ride',
        distance: 12.356680731360843,
        distance_unit: 'mile',
        strava_ride_id: 1427799923,
        rode_at: new Date('2018-02-27T00:11:18Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }, {
        id: uuid(),
        name: 'Morning Ride',
        distance: 12.226035318015045,
        distance_unit: 'mile',
        strava_ride_id: 1427067662,
        rode_at: new Date('2018-02-26T14:43:37Z'),
        bike_id: 'b2a30eb1-9e0e-4680-adeb-a8f1dfc1e2a4'
      }
    ])
  })
}
