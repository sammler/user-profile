
const SERVER_CONFIG = {
  PORT: process.env.PORT || 3011,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development'
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET || 'my-secret'
  }
};

module.exports = SERVER_CONFIG;
