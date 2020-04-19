const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

async function generateAuthToken(user) {
  return jwt.sign(
    { userId: user.id },
    process.env.SECRET_KEY || 'secret',
    { expiresIn: '24h' },
  )
  
}

async function hashpassword(password) {
  return bcrypt.hash(password, 10)
}

async function authenticate(password, hash) {
  return bcrypt.compare(password, hash)
  
}

module.exports = {
    generateAuthToken,
    hashpassword,
    authenticate
}
