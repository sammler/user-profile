
const SERVER_CONFIG = {
  PORT: process.env.PORT || 3011,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development'
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET || 'my-secret'
  },
  ENABLE_AUDIT_LOG: process.env.ENABLE_AUDIT_LOG === 'false' || true
};

module.exports = SERVER_CONFIG;
