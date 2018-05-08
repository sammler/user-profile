
// Todo: Is this needed?
module.exports = {
  configure: app => {
    app.set('port', process.env.PORT || 3011);
  }
};
