
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const hashpassword = async (password) => bcrypt.hash(password, 10);

const authenticate = async (password, hash) => bcrypt.compare(password, hash);

const generateAuthToken = async (user) => jwt.sign(
  { userId: user.id },
  process.env.SECRET_KEY || 'secret',
  { expiresIn: '24h' },
);

module.exports = {
  generateAuthToken,
  hashpassword,
  authenticate,
};