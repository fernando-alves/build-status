const urlResolve = require('url').resolve;

module.exports = function Client(httpClient) {
  let self = {};

  const apiPath = path => urlResolve('/go/api/', path);

  const pipelinesFromGroup = pipelineGroup => pipelineGroup.pipelines.map(pipeline => pipeline.name);

  const flatten = array => array.reduce((a, b) => a.concat(b), []);

  self.pipelines = function(done) {
    httpClient.get(apiPath('config/pipeline_groups'), (err, pipelineGroups) => {
      if (err) {
        return done(err);
      }
      const pipelines = flatten(pipelineGroups.map(pipelinesFromGroup));
      done(null, pipelines);
    });
  };

  self.pipelineHistory = function(pipeline, done) {
    httpClient.get(
      apiPath(`/go/api/pipelines/${pipeline}/history/0`),
      (err, history) => {
        if (err) {
          return done(err);
        }
        done(null, history.pipelines);
      }
    );
  };

  return Object.freeze(self);
};
