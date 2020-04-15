const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

module.exports = () => {
  return {
    generateAuthToken: async (user) => jwt.sign({ 
      userId: user.id
    },
    process.env.SECRET_KEY || 'secret',
    { expiresIn: '24h' },
    ),
    hashpassword: async (password) => bcrypt.hash(password, 10),
    authenticate: async (password, hash) => bcrypt.compare(password, hash),
  }
}
