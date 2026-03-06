// utils/jwtProvider.js
const jwt = require('jsonwebtoken');

const generateTokens = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET || 'secret', {
    expiresIn: '7d',
  });

  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'refresh_secret', {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

module.exports = { generateTokens };