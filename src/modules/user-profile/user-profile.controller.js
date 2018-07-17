const UserProfileModel = require('./user-profile.model').Model;
const ExpressResult = require('express-result');

class UserProfileController {

  static async CreateUpdate(req, res) {

    const userProfile = new UserProfileModel(req.body);

    await userProfile
      .save()
      .then(result => {
        console.log('result', result);
        ExpressResult.ok(res, result);
      })
      .catch(err => {
        console.log('error', err);
      });
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
