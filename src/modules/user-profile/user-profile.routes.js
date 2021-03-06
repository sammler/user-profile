const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const UserProfileController = require('./user-profile.controller.js');
const verifyJwtToken = require('../../middleware/verifyJwtToken');
// Const can = require('./../../middleware/rbac');

/**
 * @swagger
 */
router.put('/v1/user-profiles', verifyJwtToken, UserProfileController.CreateUpdate);

router.delete('/v1/user-profiles', UserProfileController.Delete);

router.get('/v1/user-profiles/:id', UserProfileController.GetById);

router.get('/v1/user-profiles', verifyJwtToken, UserProfileController.Get);

router.patch('/v1/user-profiles/:id', UserProfileController.Patch);

module.exports = router;
