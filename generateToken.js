// backend/utils/generateToken.js
const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token (JWT) for user authentication
 * @param {String} id - User ID to include in the token payload
 * @param {String} role - User role ('donor', 'hospital', or 'admin') to include in the token payload
 * @returns {String} JWT token
 */
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '30d', // Token expires in 30 days
      issuer: 'blood-bank-api',
      audience: role // Include role as audience for additional validation
    }
  );
};

/**
 * Verifies a JWT token and returns the decoded payload
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, {
    issuer: 'blood-bank-api',
    // You can add audience validation here if needed
    // audience: ['donor', 'hospital', 'admin']
  });
};

module.exports = {
  generateToken,
  verifyToken
};