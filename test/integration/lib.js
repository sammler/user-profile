const UserProfileModel = require('../../src/modules/user-profile/user-profile.model').Model;
const jwt = require('jsonwebtoken');
const cfg = require('./../../src/config/server-config');
const moment = require('moment');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function removeAll() {
  await UserProfileModel.remove();
}

function getToken(payload) {

  const pl = Object.assign({
    exp: moment().add(7, 'days').valueOf()
  }, payload);

  return jwt.sign(pl, cfg.jwt.JWT_SECRET);
}

module.exports = {
  sleep,
  removeAll,
  getToken
};
