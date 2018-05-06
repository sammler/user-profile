
const SERVER_CONFIG = {
  PORT: process.env.PORT || 3011,
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development'
  },
};

module.exports = SERVER_CONFIG;
