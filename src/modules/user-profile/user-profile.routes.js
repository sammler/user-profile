const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const UserProfileController = require('./user-profile.controller.js');

router.post('/v1/user-profiles/', UserProfileController.AddChangeProfile);
router.delete('/v1/user-profiles/', UserProfileController.Delete);

router.get('/v1/user-profiles/:id', UserProfileController.GetById);
router.get('/v1/user-profiles/', UserProfileController.GetAll);

module.exports = router;
