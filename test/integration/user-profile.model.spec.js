const superTest = require('supertest');
const mongoose = require('mongoose');
const AppServer = require('./../../src/app-server');
const UserProfileModel = require('../../src/modules/user-profile/user-profile.model').Model;
const testLib = require('./lib');

async function saveProfile(doc) {
  await new UserProfileModel(doc).save();
}

const basicUser = {
  user_id: mongoose.Types.ObjectId(), // eslint-ignore
  profile: {
    foo: 'bar'
  }
};

describe('[integration] => UserProfile Model', () => {

  let server;
  let appServer;

  beforeEach(async () => {
    appServer = new AppServer();
    await appServer.start();
    server = superTest(appServer.server);
    await UserProfileModel.remove();
  });

  afterEach(async () => {
    await testLib.removeAll();
    await appServer.stop();
  });

  describe('UserProfileModel => save', () => {

    xit('allows saving a new profile', async () => {

      let newProfile = await saveProfile(basicUser);

      expect(newProfile).to.exist;
      expect(newProfile.errors).to.not.exist;
      expect(newProfile).to.have.a.property('user_id').to.be.equal(basicUser.user_id);
      expect(newProfile).to.have.a.property('profile').to.be.equal(basicUser.profile);
      expect(newProfile).to.have.a.property('is_deleted').to.be.false;
      let count = await UserProfileModel.countDocuments({});
      expect(count).to.be.equal(1);
    });

    xit('should throw an error if inserting an existing user', async () => {

      const newProfile = await saveProfile(basicUser);
      expect(newProfile).to.exist;

      await expect(saveProfile(basicUser)).to.be.rejectedWith('E11000 duplicate key error collection:');

    });

  });

});
