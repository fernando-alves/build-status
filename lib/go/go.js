const async = require('async');

module.exports = function Go(gateway) {
  let self = {};
  let apiGateway = gateway;

  self.pipelines = function(done) {
    const parsePipelineHistory = history => {
      return history.pipelines
        .map(pipeline => {
          return pipeline.label;
        })
        .reverse();
    };

    const buildPipelines = (allPipelines, next) => {
      let pipelines = [];
      allPipelines.forEach(pipelineName => {
        apiGateway.pipelineHistory(pipelineName, (err, pipelineHistory) => {
          if (err) {
            return next(err);
          }
          let pipeline = {
            name: pipelineName,
            history: parsePipelineHistory(pipelineHistory)
          };
          pipelines.push(pipeline);
        });
      });
      next(null, pipelines);
    };
    async.waterfall([apiGateway.pipelines, buildPipelines], done);
  };

  return Object.freeze(self);
};
