const superTest = require('supertest');
const AppServer = require('./../../src/app-server');

const UserProfileModel = require('../../src/modules/user-profile/user-profile.model').Model;

// Todo: Get more out of it: https://codeutopia.net/blog/2016/06/10/mongoose-models-and-unit-tests-the-definitive-guide/
describe('UserProfileModel => unit tests', () => {

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

  it('saves', async () => {

    const doc = {
      user_id: '507f191e810c19729de860ea'
    };

    const userProfile = new UserProfileModel(doc);
    let x = await userProfile.save();
    expect(true).to.be.true;

  });

});
