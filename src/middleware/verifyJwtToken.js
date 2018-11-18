const ExpressResult = require('express-result');
const jwt = require('jsonwebtoken');
const cfg = require('./../config/server-config');
const logger = require('winster').instance(); // eslint-disable-line no-unused-vars

function verifyJwtToken(req, res, next) {

  const validationErrors = new ExpressResult.ValidationErrors();
  const token = (req.body && req.body.token) || req.headers['x-access-token'];
  if (!token) {
    validationErrors.add('Property <token> is missing. Put the <token> in either your body or use <x-access-token> in the Http-header.');
  }
  if (validationErrors.length > 0) {
    // Logger.trace('checkToken /w validationErrors', validationErrors);
    return ExpressResult.unauthorized(res, validationErrors);
  }

  try {
    const decoded = jwt.verify(token, cfg.jwt.JWT_SECRET);
    // Logger.trace('checkToken: valid token', decoded);
    req.user = decoded;
  } catch (err) {
    validationErrors.add('Invalid token');
    // Logger.trace('checkToken: invalid token');
    return ExpressResult.unauthorized(res, validationErrors);
  }
  next();
}

module.exports = verifyJwtToken;
