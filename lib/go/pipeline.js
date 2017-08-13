module.exports = function Pipeline(name, pipelineInstances) {
  let self = {};
  self.history = [];
  self.name = name;

  (function parseHistory() {
    const pipelineResult = stages => {
      const failed = stage => {
        return stage.result.toLowerCase() === 'failed';
      };
      return stages.some(failed) ? 'failed' : 'passed';
    };

    self.history = pipelineInstances
      .map(pipeline => {
        return {
          label: pipeline.label,
          result: pipelineResult(pipeline.stages)
        };
      })
      .reverse();
  })();

  return Object.freeze(self);
};
