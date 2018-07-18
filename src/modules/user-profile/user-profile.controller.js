const UserProfileModel = require('./user-profile.model').Model;
const ExpressResult = require('express-result');

class UserProfileController {

  static async CreateUpdate(req, res, next) {

    const userProfile = new UserProfileModel(req.body);

    try {
      let result = await userProfile.save();
      ExpressResult.ok(res, result);
      next();
    } catch (err) {
      ExpressResult.error(res, {err})
      next();
    }
  }

  static Delete(req, res, next) {
    next();
  }

  static Purge(req, res, next) {
  }

  static GetById(req, res, next) {
    next();
  }

  static GetAll(req, res, next) {
    next();
  }

  static Patch(req, res, next) {
    next();
  }

}

module.exports = UserProfileController;
