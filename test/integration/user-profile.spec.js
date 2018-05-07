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

  describe.only('UserProfileModel => save', () => {
    it('allows saving a new profile', async () => {

      const doc = {
        user_id: mongoose.Types.ObjectId(),
        key: 'first thing'
      };

      let newProfile = await new UserProfileModel(doc).save();
      expect(newProfile).to.exist;
      expect(newProfile.errors).to.not.exist;
      expect(newProfile).to.have.a.property('user_id').to.be.equal(doc.user_id);
      expect(newProfile).to.have.a.property('key').to.be.equal(doc.key);
    });

    it('prevents saving a duplicate/key combination', async () => {

      const doc = {
        user_id: mongoose.Types.ObjectId(),
        key: 'first thing'
      };

      try {
        await new UserProfileModel(doc).save();
        await new UserProfileModel(doc).save();

      } catch (e) {
        expect(e).to.exist;
        expect(e).to.have.a.property('name').to.contain('BulkWriteError');
        expect(e).to.have.a.property('message').to.contain('E11000 duplicate key error collection');
      }
    });

    it('allows saving multiple profiles for the same user', async () => {
      try {
        let userId = mongoose.Types.ObjectId();

        await new UserProfileModel({
          user_id: userId,
          key: 'foo'
        }).save();

        await new UserProfileModel({
          user_id: userId,
          key: 'bar'
        }).save();

      } catch (e) {
        expect(e).to.not.exist;
      }
    });

    it('allows saving multiple profiles with the same keys, but for different users', async () => {
      try {
        await new UserProfileModel({
          user_id: mongoose.Types.ObjectId(),
          key: 'foo'
        }).save();

        await new UserProfileModel({
          user_id: mongoose.Types.ObjectId(),
          key: 'foo'
        }).save();

      } catch (e) {
        expect(e).to.not.exist;
      }
    });
  });
});
