
const ROLES = {
  'normal': {can: []},
  'user': {can: []},
  'owner': {can: ['readOwn', 'createOwn', 'updateOwn', 'deleteOwn']},
  'admin': {can: ['readOther', 'writeOther', 'updateOther', 'deleteOther', 'purgeOther']},
  'system': {can: ['readOther']}
};

module.exports = {
  ROLES
};
