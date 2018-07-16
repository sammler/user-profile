const superTest = require('supertest');
const AppServer = require('./../../src/app-server');
const testLib = require('./lib');



describe('App-Server', () => {

  let server;
  let appServer;

  beforeEach(async () => {
    appServer = new AppServer();
    await appServer.start();
    server = superTest(appServer.server);
  });

  afterEach(async () => {

    await testLib.sleep(100);
    await appServer.stop();
  });

  it('should expose configs', () => {

    expect(appServer).to.have.a.property('config').to.exist;

  });
});
