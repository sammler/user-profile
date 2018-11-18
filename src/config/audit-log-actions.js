const _ = require('lodash');

const BASE_PROPS = {
  event_domain: 'user',
  source: '/user-profile'
};

function getActorDetails(user) {
  return {
    username: user.local.username,
    email: user.local.email
  };
}

module.exports = {
  SUBJECT: 'user-profile',
  cloudEvents: {
    getCreateProfileEvent: props => {
      return Object.assign({
        event: 'createUpdate',
        actor_group: _.get(props.user, ['tenant_id']),
        actor: props.user._id,
        actor_details: getActorDetails(props.user),
        action_type: 'C',
        description: 'Create User profile.'
      }, BASE_PROPS);
    },
    getUpdateProfileEvent: props => {
      return Object.assign({
        event: 'createUpdate',
        actor_group: _.get(props.user, ['tenant_id']),
        actor: props.user._id,
        actor_details: getActorDetails(props.user),
        action_type: 'U',
        description: 'Update user profile.'
      }, BASE_PROPS);
    }
  }
};
