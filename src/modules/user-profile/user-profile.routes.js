const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const UserProfileController = require('./user-profile.controller.js');
const mw = require('./../../middleware/processJwt');
const can = require('./../../middleware/rbac');

function getUser(req, res) {

}

router.put('/v1/user-profiles/:id', mw.processJwt, can('user-profile:createUpdateOwn', {user: {user_id: 10}}), UserProfileController.CreateUpdate);

router.delete('/v1/user-profiles', UserProfileController.Delete);

router.get('/v1/user-profiles/:id', UserProfileController.GetById);

router.get('/v1/user-profiles', UserProfileController.GetAll);

router.patch('/v1/user-profiles/:id', UserProfileController.Patch);

module.exports = router;
