process.env.NODE_ENV = 'test'

const fs = require('fs')
const path = require('path')
const assert = require('chai').assert
const knex = require('../knex')

const {
  defaultTeamId,
  teamsTable,
  usersTable,
  bikesTable,
  partsTable,
  ridesTable,
  repairsTable,
  conditionsTable
} = require('../database/utils')

beforeEach((done) => {
  knex.migrate.rollback().then(() => {
    return knex.migrate.latest()
  }).then(() => {
    return knex.seed.run()
  }). finally(() => {
    done()
  })
})

afterEach((done) => {
  knex.migrate.rollback(). finally(() => {
    done()
  })
})

after(() => {
  knex.destroy()
})

describe('database migration check', () => {
  describe('teams table', () => {
    it('teams table', (done) => {
      knex(teamsTable).columnInfo().then((actual) => {
        const expected = {
          id: {
            type: 'uuid',
            maxLength: null,
            nullable: true,
            defaultValue: null
          },
          name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },
          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          },
          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          }
        }

        /* eslint-disable */
        for (const column in expected) {
          assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`)
        }
        /* eslint-enable */

        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
  describe('users table', () => {
    it('users table', (done) => {
      knex(usersTable).columnInfo().then((actual) => {
        // console.log('actual', actual)
        const expected = {
          id: {
            type: 'uuid',
            maxLength: null,
            nullable: true,
            defaultValue: null
          },
          first_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },
          last_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },
          email: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },
          hashed_password: {
            type: 'character',
            maxLength: 60,
            nullable: true,
            defaultValue: '\'\'::bpchar'
          },
          strava_user_id: {
            type: 'character varying',
            maxLength: 60,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },
          strava_access_token: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },
          access_type: {
            type: 'character varying',
            maxLength: 20,
            nullable: false,
            defaultValue: '\'normal\'::character varying'
          },
          team_id: {
            type: 'uuid',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },
          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          },
          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          }
        }

        /* eslint-disable */
        for (const column in expected) {
          assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`)
        }
        /* eslint-enable */

        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
  describe('bikes table', () => {
    it('bikes table', (done) => {
      knex(bikesTable).columnInfo().then((actual) => {
        const expected = {
          id: {
            type: 'uuid',
            maxLength: null,
            nullable: true,
            defaultValue: null
          },
          nick_name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },
          type: {
            type: 'character varying',
            maxLength: 20,
            nullable: false,
            defaultValue: null
          },
          brand: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },
          model: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },
          distance: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: '0'
          },
          distance_unit: {
            type: 'character varying',
            maxLength: 20,
            nullable: false,
            defaultValue: null
          },
          user_id: {
            type: 'uuid',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },
          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          },
          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          }
        }

        /* eslint-disable */
        for (const column in expected) {
          assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`)
        }
        /* eslint-enable */

        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
  describe('parts table', () => {
    it('parts table', (done) => {
      knex(partsTable).columnInfo().then((actual) => {
        const expected = {
          id: {
            type: 'uuid',
            maxLength: null,
            nullable: true,
            defaultValue: null
          },
          name: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: null
          },
          bike_id: {
            type: 'uuid',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },
          brand: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },
          model: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },
          max_life_span: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: '100'
          },
          distance: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: '0'
          },
          unit: {
            type: 'character varying',
            maxLength: 20,
            nullable: false,
            defaultValue: null
          },
          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          },
          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          }
        }

        /* eslint-disable */
        for (const column in expected) {
          assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`)
        }
        /* eslint-enable */

        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
  describe('rides table', () => {
    it('rides table', (done) => {
      knex(ridesTable).columnInfo().then((actual) => {
        const expected = {
          id: {
            type: 'uuid',
            maxLength: null,
            nullable: true,
            defaultValue: null
          },
          strava_ride_id: {
            type: 'character varying',
            maxLength: 255,
            nullable: false,
            defaultValue: '\'\'::character varying'
          },
          rode_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'now()'
          },
          distance: {
            type: 'integer',
            maxLength: null,
            nullable: false,
            defaultValue: '0'
          },
          distance_unit: {
            type: 'character varying',
            maxLength: 20,
            nullable: false,
            defaultValue: null
          },
          bike_id: {
            type: 'uuid',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },
          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          },
          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          }
        }

        /* eslint-disable */
        for (const column in expected) {
          assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`)
        }
        /* eslint-enable */

        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
  describe('repairs table', () => {
    it('repairs table', (done) => {
      knex(repairsTable).columnInfo().then((actual) => {
        const expected = {
          id: {
            type: 'uuid',
            maxLength: null,
            nullable: true,
            defaultValue: null
          },
          bike_id: {
            type: 'uuid',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },
          part_id: {
            type: 'uuid',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },
          type: {
            type: 'character varying',
            maxLength: 20,
            nullable: false,
            defaultValue: null
          },
          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          },
          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          }
        }

        /* eslint-disable */
        for (const column in expected) {
          assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`)
        }
        /* eslint-enable */

        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
  describe('conditions table', () => {
    it('conditions table', (done) => {
      knex(conditionsTable).columnInfo().then((actual) => {
        const expected = {
          id: {
            type: 'uuid',
            maxLength: null,
            nullable: true,
            defaultValue: null
          },
          type: {
            type: 'character varying',
            maxLength: 20,
            nullable: false,
            defaultValue: null
          },
          condition: {
            type: 'character varying',
            maxLength: 20,
            nullable: false,
            defaultValue: null
          },
          ride_id: {
            type: 'uuid',
            maxLength: null,
            nullable: false,
            defaultValue: null
          },
          created_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          },
          updated_at: {
            type: 'timestamp with time zone',
            maxLength: null,
            nullable: false,
            defaultValue: 'CURRENT_TIMESTAMP'
          }
        }

        /* eslint-disable */
        for (const column in expected) {
          assert.deepEqual(actual[column], expected[column], `Column ${column} is not the same`)
        }
        /* eslint-enable */

        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
})

describe('database seed check', () => {
  describe('teams table', () => {
    it('default team', (done) => {
      knex(teamsTable).then((rows) => {
        assert.isAbove(rows.length, 0, 'There is a default team')
        assert.equal(rows[0].name, 'Default', `The default team name is 'Default'`)
        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
  describe('users table', () => {
    it('two users in the table', (done) => {
      knex(usersTable).then((rows) => {
        assert.equal(rows.length, 2, 'There are 2 users')
        assert.equal(rows[0].first_name, 'Jane', `The first name of the first user is 'Jane'`)
        assert.equal(rows[1].first_name, 'John', `The first name of the first user is 'John'`)
        done()
      }).catch((err) => {
        done(err)
      })
    })
  })
})
