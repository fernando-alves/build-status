const urlResolve = require('url').resolve;

module.exports = function Client(httpClient) {
  let self = {};

  const apiPath = path => {
    return urlResolve('/go/api/', path);
  };

  const pipelinesFromGroup = pipelineGroup => {
    return pipelineGroup.pipelines.map(pipeline => {
      return pipeline.name;
    });
  };

  const flatten = array => {
    return array.reduce((a, b) => {
      return a.concat(b);
    });
  };

  self.pipelines = function(done) {
    httpClient.get(apiPath('config/pipeline_groups'), (err, pipelineGroups) => {
      if (err) {
        return done(err, null);
      }
      const pipelines = flatten(pipelineGroups.map(pipelinesFromGroup));
      done(null, pipelines);
    });
  };

  return Object.freeze(self);
};
