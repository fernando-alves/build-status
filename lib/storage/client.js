module.exports = function Client(config) {
  let self = {};
  let db = null;

  self.start = function(done) {
    config.gateway.connect(config.host, (err, database) => {
      if (err) {
        return done(err);
      }
      db = database;
      done();
    });
  };

  const started = () => {
    return db != null;
  };

  self.stop = function(done) {
    if (started()) {
      return db.close(done);
    }
    done();
  };

  return Object.freeze(self);
};
