module.exports = function Go(gateway) {
  let self = {};
  let apiGateway = gateway;

  self.pipelines = function(done) {
    apiGateway.pipelines(done);
  };

  return Object.freeze(self);
};
