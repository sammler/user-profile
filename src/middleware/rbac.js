const RBAC = require('easy-rbac');
const ExpressResult = require('express-result');
const rbac_config = {

  user: {
    can: [
      'user-profile:createUpdate',
      'user-profile:getOwn'
    ]
  },
  service: {
    can: []
  },
  admin: {
    can: []
  }

};
const rbac = new RBAC(rbac_config);

function can(roleToCheck, params) {

  const _middleware = function (req, res, next) {

    const roles = req.user.roles;
    console.log('req.user.roles: ', roles); //Todo: Remove console.log
    console.log('can.roleToCheck: ', roleToCheck); //Todo: Remove console.log
    console.log('can:params: ', params); //Todo: Remove console.log

    rbac.can(roles, roleToCheck, params)
      .then(result => {
        if (result) {
          console.log('we have access'); //Todo: Remove console.log
          next();
        } else {
          console.log('we dont have access');  //Todo: Remove console.log
          return ExpressResult.unauthorized(res, 'we just do not have access');
        }
      })
      .catch(err => {
        console.log('something else went wrong', err); //Todo: Remove console.log
      });

    next();
  };
  return _middleware;


}

module.exports = can;
