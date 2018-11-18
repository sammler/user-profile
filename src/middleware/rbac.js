const RBAC = require('easy-rbac');
const ExpressResult = require('express-result');
const logger = require('winster').instance();
const rbac_config = {

  user: {
    can: [
      'user-profile:create',
      'user-profile:update:own',
      'user-profile:delete:own',
      'user-profile:read:own'
    ]
  },
  tenant_admin: {
    inherits: ['user']
  },
  admin: {
    inherits: ['tenant_admin']
  },
  system: {
    can: [],
    inherits: ['user']
  }
};

const rbac = new RBAC(rbac_config);

function can(roleToCheck, params) {

  const _middleware = function (req, res, next) {

    const roles = req.user.roles;
    logger.trace('req.user.roles: ', roles); // Todo: Remove console.log
    logger.trace('can.roleToCheck: ', roleToCheck); // Todo: Remove console.log
    logger.trace('can:params: ', params); // Todo: Remove console.log

    rbac.can(roles, roleToCheck, params)
      .then(result => {
        if (result) {
          console.log('we have access'); // Todo: Remove console.log
          next();
        } else {
          console.log('we dont have access'); // Todo: Remove console.log
          return ExpressResult.unauthorized(res, 'we just do not have access');
        }
      })
      .catch(err => {
        console.log('something else went wrong', err); // Todo: Remove console.log
      });

    next();
  };
  return _middleware;

}

module.exports = can;
