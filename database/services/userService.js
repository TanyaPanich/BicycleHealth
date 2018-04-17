const knex = require('../../knex')
const boom = require('boom')
const {
  usersTable,
  bikesTable,
  partsTable,
  ridesTable,
  repairsTable,
  conditionsTable
} = require('../utils')

class UserService {
  insert(user) {
    console.log("I am on insert!", req.body)
    if(!user.email) next(boom.badRequest('Email must not be blank'))
    isEmailExist(user.email, next)
    if(!user.password1 || user.password1.length < 8)
      next(boom.badRequest('Password must be at least 8 characters long'))

    knex('users')
      .returning(['id','first_name','last_name', 'email'])
      .insert(user)
      .then((result) => {
        console.log("I am creating new user", result)
        const token = jwt.sign({'email': result.email }, process.env.SECRET_KEY)
        res.setHeader('Set-Cookie', `token=${token};`)
        res.render('index', { title: 'Bicycle health' })
      }).catch(err => {
        console.log('I got error', err)
          next(err)
      })
  }
}

module.exports = UserService
