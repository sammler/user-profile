const superTest = require('supertest');
const mongoose = require('mongoose');
const AppServer = require('./../../src/app-server');
const UserProfileModel = require('../../src/modules/user-profile/user-profile.model').Model;

describe('UserProfile => integration tests', () => {

  let server;
  let appServer;

  beforeEach(async () => {
    appServer = new AppServer();
    await appServer.start();
    server = superTest(appServer.server);
    await UserProfileModel.remove();
  });

  afterEach(async () => {
    await appServer.stop();
  });

  describe('UserProfileModel => save', () => {

    it('allows saving a new profile', async () => {

      const doc = {
        user_id: mongoose.Types.ObjectId()
      };

      let newProfile = await new UserProfileModel(doc).save();
      expect(newProfile).to.exist;
      expect(newProfile.errors).to.not.exist;
      expect(newProfile).to.have.a.property('user_id').to.be.equal(doc.user_id);
    });

  });

});
