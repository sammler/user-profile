const RBAC = require('easy-rbac');
const ExpressResult = require('express-result');
const rbac_config = {

  user: {
    can: [
      {
        name: 'user-profile:createUpdateOwn',
        when: async (params) => params.user.user_id === params.userProfile.user_id
      },
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

function can(params) {

  const _middleware = function (req, res, next) {

    const role = req.user.role;
    console.log('can:role: ', role);

    console.log(rbac.can(role, 'user-profile:createUpdateOwn', params)
      .then(result => {
        if (result) {
          console.log('we have access');
        } else {
          console.log('we dont have access');
          ExpressResult.unauthorized(res, 'we just do not have access');
        }
      })
      .catch(err => {
        console.log('something else went wrong', err);
      }));

    next();
  };
  return _middleware;


}

module.exports = can;
