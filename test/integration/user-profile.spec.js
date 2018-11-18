const superTest = require('supertest');
const HttpStatus = require('http-status');
const _ = require('lodash');
const AppServer = require('./../../src/app-server');
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const testLib = require('./lib');
const defaultConfig = require('./../../src/config/server-config');
const UserProfileModel = require('../../src/modules/user-profile/user-profile.model').Model;
const logger = require('winster').instance();

describe('[integration] => REST API', () => {

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
          .put(`/v1/user-profiles`)
          .send(doc)
          .expect(HttpStatus.UNAUTHORIZED);
        expect(await UserProfileModel.countDocuments()).to.be.equal(0);

      });

      it('return UNAUTHORIZED for users with an invalid token', async () => {
        const doc = {
          user_id: mongoose.Types.ObjectId(),
          token: 'foo'
        };

        await server
          .put(`/v1/user-profiles`)
          .send(doc)
          .expect(HttpStatus.UNAUTHORIZED);

        expect(await UserProfileModel.countDocuments()).to.be.equal(0);
      });

      it('can be created by authenticated users (body)', async () => {

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
          .put(`/v1/user-profiles`)
          .send(doc)
          .expect(HttpStatus.OK)
          .then(result => {
            // Console.log('result', result);
            expect(result).to.exist;
            expect(result.body).to.exist;
          })
          .catch(err => {
            console.log('we have an error', err);
            expect(err).to.not.exist;
          });

        await server
          .get(`/v1/user-profiles`)
          .send({
            token: testLib.getToken(tokenPayload)
          })
          .expect(HttpStatus.OK)
          .then(result => {
            expect(result.body).to.have.a.property('is_deleted').to.be.false;
            expect(result.body).to.have.a.property('profile').to.deep.equal(doc.profile);
            expect(result.body).to.have.a.property('user_id').to.equals(doc.user_id.toString());
          });

        expect(await UserProfileModel.countDocuments()).to.be.equal(1);
      });

      it('can be created by an authenticated user (header)', async () => {
        const id = mongoose.Types.ObjectId();
        const tokenPayload = {
          user_id: id,
          roles: ['user']
        };
        const doc = {
          user_id: id,
          profile: {
            foo: 'bar'
          }
        };

        await server
          .put(`/v1/user-profiles`)
          .set('x-access-token', testLib.getToken(tokenPayload))
          .send(doc)
          .expect(HttpStatus.OK)
          .then(result => {
            // Console.log('result', result);
            expect(result).to.exist;
            expect(result.body).to.exist;
          })
          .catch(err => {
            console.log('we have an error', err);
            expect(err).to.not.exist;
          });

        await server
          .get(`/v1/user-profiles`)
          .set('x-access-token', testLib.getToken(tokenPayload))
          .expect(HttpStatus.OK)
          .then(result => {
            expect(result.body).to.have.a.property('is_deleted').to.be.false;
            expect(result.body).to.have.a.property('profile').to.deep.equal(doc.profile);
            expect(result.body).to.have.a.property('user_id').to.equals(doc.user_id.toString());
          });

        expect(await UserProfileModel.countDocuments()).to.be.equal(1);

      });

      it('can be modified by the owner', async() => {
        const id = mongoose.Types.ObjectId();
        const tokenPayload = {
          user_id: id,
          roles: ['user']
        };

        const doc = {
          user_id: id,
          profile: {
            foo: 'bar'
          }
        };

        await server
          .put(`/v1/user-profiles`)
          .set('x-access-token', testLib.getToken(tokenPayload))
          .send(doc)
          .expect(HttpStatus.OK);

        const updatedDoc = Object.assign(doc, {
          profile: {
            foo: 'baz'
          }
        });

        await server
          .put(`/v1/user-profiles`)
          .set('x-access-token', testLib.getToken(tokenPayload))
          .send(updatedDoc)
          //.expect(HttpStatus.OK)
          .then(result => {
            logger.trace(result);
            expect(result).to.exist;
            expect(result.body).to.have.property('nModified').to.equal(1);
          })
          .catch(err => {
            logger.trace(err);
            expect(err).to.not.exist;
          });

        await server
          .get(`/v1/user-profiles`)
          .set('x-access-token', testLib.getToken(tokenPayload))
          .expect(HttpStatus.OK)
          .then(result => {
            expect(result).to.exist;
            expect(result.body).to.exist;
            expect(result.body).to.have.property('profile').to.have.property('foo').to.be.equal('baz');
          });
          // .catch(err => {
          //   logger.trace(err);
          //   expect(err).to.not.exist;
          // });

        expect(await UserProfileModel.countDocuments()).to.be.equal(1);
      });
      it('can be modified by the tenant_admin');
      it('can be modified by an admin');
      it('cannot be modified by other users');
      it('cannot be modified by system users');
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
