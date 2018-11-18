const UserProfileModel = require('./user-profile.model').Model;
const ExpressResult = require('express-result');

class UserProfileController {

  static async CreateUpdate(req, res) {

    const user_id = req.user.user_id;

    try {
      let result = await UserProfileModel.update(
        {user_id: user_id},
        req.body,
        {
          upsert: true,
          setDefaultsOnInsert: true
        }
      );
      ExpressResult.ok(res, result);
    } catch (err) {
      ExpressResult.error(res, {err});
    }
  }

  static Delete(req, res, next) {
    next();
  }

  static Purge(req, res, next) {
    next();
  }

  static Get(req, res) {

    UserProfileModel
      .findOne({user_id: req.user.user_id})
      .exec()
      .then(result => ExpressResult.ok(res, result))
      .catch(err => ExpressResult.error(res, err));
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
