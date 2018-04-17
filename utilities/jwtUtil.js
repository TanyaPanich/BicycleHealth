const jwt = require('jsonwebtoken')

function handleResponse(op, email, httpRes, user) {
  const token = jwt.sign({
    'email': email
  }, process.env.SECRET_KEY)
  httpRes.setHeader('Set-Cookie', `token=${token};`)
  httpRes.sendStatus(200)
}

module.exports = handleResponse
