const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const UserProfileController = require('./user-profile.controller.js');

router.post('/v1/user-profile/', UserProfileController.AddChangeProfile);
