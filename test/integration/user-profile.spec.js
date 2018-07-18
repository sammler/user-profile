const superTest = require('supertest');
const HttpStatus = require('http-status');
const _ = require('lodash');
const AppServer = require('./../../src/app-server');
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const testLib = require('./lib');
const defaultConfig = require('./../../src/config/server-config');

describe('UserProfile Model => integration tests', () => {

  let server;
  let appServer;

  beforeEach(async () => {
    appServer = new AppServer(defaultConfig);
    await appServer.start();
    server = superTest(appServer.server);
    await testLib.removeAll();
  });

  afterEach(async () => {
    await appServer.stop();
  });

  describe('User profiles', () => {

    describe('using PUT `/v1/user-profiles`', () => {

      it('returns UNAUTHORIZED for non-authenticated users', async () => {

        const doc = {
          user_id: mongoose.Types.ObjectId(),
          profile: {
            foo: 'bar'
          }
        };

        await server
          .put(`/v1/user-profiles/${doc.user_id}`)
          .send(doc)
          .expect(HttpStatus.UNAUTHORIZED);

      });

      it('return UNAUTHORIZED for users with an invalid token', async () => {
        const doc = {
          user_id: mongoose.Types.ObjectId(),
          token: 'foo'
        };

        return server
          .put(`/v1/user-profiles/${doc.user_id}`)
          .send(doc)
          .expect(HttpStatus.UNAUTHORIZED);
      });

      it('can be created by authenticated users', async () => {

        const id = mongoose.Types.ObjectId();
        const tokenPayload = {
          user_id: id,
          roles: ['user']
        };
        const doc = {
          user_id: id,
          profile: {
            foo: 'bar'
          },
          token: testLib.getToken(tokenPayload)
        };

        await server
          .put(`/v1/user-profiles/${doc.user_id}`)
          .send(doc)
          .expect(HttpStatus.OK)
          .then(result => {
            // Console.log('result', result);
            expect(result).to.exist;
            expect(result.body).to.exist;
            expect(result.body).to.have.a.property('is_deleted').to.be.false;
            expect(result.body).to.have.a.property('profile').to.deep.equal(doc.profile);
            expect(result.body).to.have.a.property('user_id').to.equals(doc.user_id.toString());
          })
          .catch(err => {
            console.log('we have an error', err);
            expect(err).to.not.exist;
          });

      });
      it('cannot be created by non-authenticated users');
      it('can be modified by the owner');
      it('cannot be modified by other users');
      it('cannot be modified by system users');
      it('can be modified by admins');
    });

    describe('using DELETE `/v1/user-profiles/:id/`', () => {
      it('cannot be deleted by users');
      it('can be deleted by the owner');
      it('can be deleted by the admin');
      it('cannot be deleted by the system user');
      it('will only be marked as deleted, but not purged');
      it('cannot be fetched anymore if deleted');
    });

    describe('using PATCH `/v1/user-profiles/:id/` {action: "purge"}', () => {
      it('cannot be purged by non-admins');
      it('can be purged by admins');
    });

    describe('using GET `/v1/user-profiles`', () => {
      it('lists all user profiles for admins');
      it('lists all user profiles for system users');
      it('does not list all user profiles for users');
      it('does not list all user profiles for owners');
      it('lists also deleted user profiles.');
    });

    // It('can be fetched if not deleted');
    // it('cannot be fetched if deleted');
    // it('can be deleted by the given user');
    // it('cannot be deleted by other users');
    // it('can be fetched by the owner');
    // it('can be fetched by system users');
    // it('cannot be fetched by other users');
    // it('Admins & system users can fetch all profiles');
    // it('users cannot get all profiles');

  });

});
