const URL = require('url').URL;
const urlResolve = require('url').resolve;

module.exports = function Client(config, requester) {
  let self = {};
  let baseUrl;
  let request = requester || require('request');

  (function validateConfig() {
    const validConfig = config => {
      const mandatoryFields = ['hostname', 'username', 'password'];
      const missingFields = mandatoryFields.filter(field => {
        return !config[field];
      });
      return missingFields.length === 0;
    };

    if (!validConfig(config)) {
      throw new Error('Config is missing fields');
    }
  })();

  (function parseConfig() {
    baseUrl = new URL(config.hostname);
    baseUrl.username = config.username;
    baseUrl.password = config.password;
  })();

  const requestUrl = path => {
    let url = baseUrl.href;
    if (path != '') {
      url = urlResolve(baseUrl.href, path);
    }
    return { url: url };
  };

  self.get = function(path, done) {
    request.get(requestUrl(path), (err, res, body) => {
      done(err, JSON.parse(body));
    });
  };

  return Object.freeze(self);
};
