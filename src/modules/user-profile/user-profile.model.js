const mongoose = require('mongoose');
const timeStamps = require('mongoose-timestamp');

const mongooseConfig = require('./../../config/mongoose-config');
// const logger = require('winster').instance();

const Schema = mongoose.Schema;

/* eslint-disable camelcase */
const schema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    required: true
  },
  key: {
    type: Schema.Types.String,
    required: true
  },
  values: {
    type: Schema.Types.Mixed
  },
  doc_version: {
    type: Schema.Types.String,
    required: true,
    default: '1'
  }
}, {
  collection: mongooseConfig.COLLECTION_PREFIX + mongooseConfig.COLLECTION_USER_PROFILE,
  strict: true
});
/* eslint-enable camelcase */

schema.index({ user_id: 1, key: 1}, { unique: true });
schema.plugin(timeStamps, {createdAt: mongooseConfig.FIELD_CREATED_AT, updatedAt: mongooseConfig.FIELD_UPDATED_AT});

module.exports = {
  Schema: schema,
  Model: mongoose.model(mongooseConfig.COLLECTION_USER_PROFILE, schema)
};

