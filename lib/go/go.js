const async = require('async');
const Pipeline = require('./pipeline');

module.exports = function Go(gateway) {
  let self = {};
  let apiGateway = gateway;

  self.pipelines = function(done) {
    const buildPipelines = (allPipelines, next) => {
      const build = (pipelineName, next) => {
        apiGateway.pipelineHistory(pipelineName, (err, pipelineHistory) => {
          if (err) {
            return next(err);
          }
          next(null, new Pipeline(pipelineName, pipelineHistory));
        });
      };

      async.map(allPipelines, build, next);
    };

    async.waterfall([apiGateway.pipelines, buildPipelines], done);
  };

  return Object.freeze(self);
};
