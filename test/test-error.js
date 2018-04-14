process.env.NODE_ENV = 'test'

const request = require('supertest')
const expect = require('chai').expect
const app = require('../app')

beforeEach((done) => {
  done()
})

afterEach((done) => {
  done()
})

after((done) => {
  done()
})

describe('Route Not Found', () => {
  it('returns error in JSON', (done) => {
    request(app)
      .get('/notfound')
      .expect('Content-Type', /json/, done)
  })
  it('returns status 404', (done) => {
    request(app)
      .get('/notfound')
      .expect(404, done)
  })
})
