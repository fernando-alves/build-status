module.exports = function Go(config) {
  let self = {};
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

  return Object.freeze(self);
};
