const jwt = require('jsonwebtoken')
const boom = require('boom')

function handleResponse(op, email, httpRes, user) {
  console.log('email: ', email)
  const token = jwt.sign({
    'email': email
  }, process.env.SECRET_KEY)
  console.log('token: ', token)
  httpRes.setHeader('Set-Cookie', `token=${token};`)
}

function verifyToken(req, res, next) {
  console.log('verifyToken: ', req.cookies)
  if(!req.cookies.token) {
    return next(boom.unauthorized())
  }
  const token = req.cookies.token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      next(boom.unauthorized())
    }
    else {
      req.token = decoded
      next()
    }
  })
}

module.exports = {
  handleResponse,
  verifyToken
}
