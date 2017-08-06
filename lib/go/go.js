module.exports = function Go(config, gateway) {
  let self = {};
  let apiGateway = gateway;
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

  self.pipelines = function(done) {
    apiGateway.pipelines(done);
  };

  return Object.freeze(self);
};
