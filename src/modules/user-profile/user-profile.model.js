const mongoose = require('mongoose');
// const timeStamps = require('mongoose-timestamp');
// const _ = require('lodash');

const mongooseConfig = require('./../../config/mongoose-config');
// const logger = require('winster').instance();

const Schema = mongoose.Schema;

/* eslint-disable camelcase */
const schema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    required: true
  }
  // ,
  // profiles: [
  //   {
  //     key: {
  //       type: Schema.Types.String,
  //       required: true
  //     },
  //     value: Schema.Types.Mixed
  //   }
  // ]
}, {
  collection: mongooseConfig.COLLECTION_PREFIX + mongooseConfig.COLLECTION_USER_PROFILE,
  strict: true
});
/* eslint-enable camelcase */

// schema.index({"local.username": 1});
// schema.plugin(timeStamps, {createdAt: mongooseConfig.FIELD_CREATED_AT, updatedAt: mongooseConfig.FIELD_UPDATED_AT});

module.exports = {
  Schema: schema,
  Model: mongoose.model(mongooseConfig.COLLECTION_USER_PROFILE, schema)
};

