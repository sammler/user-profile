
module.exports = {
  debug: process.env.MONGODB_DEBUG || false,
  host: process.env.MONGODB_HOST || 'localhost',
  port: process.env.MONGODB_PORT || 27017,

  COLLECTION_PREFIX: process.env.MONGODB_COLLECTION_PREFIX || 'user-profile~~',

  FIELD_CREATED_AT: 's5r_created_at',
  FIELD_UPDATED_AT: 's5r_updated_at'
};
