const _ = require('lodash');
const express = require('express');
const initializer = require('express-initializers');
const logger = require('winster').instance();
const mongoose = require('mongoose');
const MongooseConnectionConfig = require('mongoose-connection-config');
const path = require('path');

const defaultConfig = require('./config/server-config');

class AppServer {

  constructor(config) {

    this.config = _.extend(_.clone(defaultConfig), config || {});

    this.server = null;
    this.logger = logger;

    this.app = express();
  }

  async start() {
    const mongoUri = new MongooseConnectionConfig(require('./config/mongoose-config')).getMongoUri();
    this.logger.trace('mongoUri', mongoUri);
    await initializer(this.app, {directory: path.join(__dirname, 'initializers')});
    await mongoose.connect(mongoUri, {useNewUrlParser: true});

    try {
      this.server = await this.app.listen(this.config.PORT);
      this.logger.info(`Express server listening on port ${this.config.PORT} in "${this.config.env.NODE_ENV}" mode`);
    } catch (err) {
      let thrownError = new Error('Cannot start express server', err);
      this.logger.error(thrownError);
      throw thrownError;
    }
  }

  async stop() {
    if (mongoose.connection) {
      try {
        await mongoose.connection.close(); // Using Moongoose >5.0.4 connection.close is preferred over mongoose.disconnect();
        mongoose.models = {};
        mongoose.modelSchemas = {};
        this.logger.trace('Closed mongoose connection');
      } catch (e) {
        this.logger.trace('Could not close mongoose connection', e);
      }
    }
    if (this.server) {
      try {
        await this.server.close();
        this.logger.trace('Server closed');
      } catch (e) {
        this.logger.trace('Could not close server', e);
      }
    }
  }
}

module.exports = AppServer;
