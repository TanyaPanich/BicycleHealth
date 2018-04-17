const jwt = require('jsonwebtoken')

function handleResponse(op, email, httpRes, user) {
  console.log('handleResponse')
  console.log(`${op} succeeded for user ${email}:`, user)
  const token = jwt.sign({
    'email': email
  }, process.env.SECRET_KEY)
  httpRes.setHeader('Set-Cookie', `token=${token};`)
}

module.exports = handleResponse
