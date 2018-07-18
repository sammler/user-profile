const EnvVal = require('env-val');
const joi = EnvVal.joi;

const schema = joi.object({

  MONGODB_DEBUG: joi
    .boolean()
    .default(false),

  MONGODB_HOST: joi
    .string()
    .default('localhost'),

  MONGODB_PORT: joi
    .number()
    .default(27017),

  MONGODB_COLLECTION_PREFIX: joi
    .string()
    .default('user-profile~~')

}).required();

const {error, value: envVars} = joi.validate(process.env, schema, {allowUnknown: true, stripUnknown: true});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const values = {
  debug: envVars.MONGODB_DEBUG,
  host: envVars.MONGODB_HOST,
  port: envVars.MONGODB_PORT,

  COLLECTION_PREFIX: envVars.MONGODB_COLLECTION_PREFIX,

  COLLECTION_USER_PROFILE: 'profiles',

  FIELD_CREATED_AT: 's5r_created_at',
  FIELD_UPDATED_AT: 's5r_updated_at'
};

module.exports = values;

