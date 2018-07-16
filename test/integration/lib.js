const UserProfileModel = require('../../src/modules/user-profile/user-profile.model').Model;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function removeAll() {
  return await UserProfileModel.remove();
}



module.exports = {
  sleep,
  removeAll
};
