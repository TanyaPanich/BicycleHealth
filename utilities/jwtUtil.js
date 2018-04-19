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
  console.log('verifyToken - cookies: ', req.cookies)
  if (req.session.passport) {
    console.log('verifyToken - session.passport: ', req.session.passport)
    const decoded = { email: req.session.passport.user.email }
    req.token = decoded
    next()
  }
  else if (req.cookies.token) {
    const token = req.cookies.token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log('jwt.verify err', err)
        next(boom.unauthorized())
      }
      else {
        console.log('decoded', decoded)
        req.token = decoded
        next()
      }
    })
  }
  else {
    return next(boom.unauthorized())
  }
}

module.exports = {
  handleResponse,
  verifyToken
}
