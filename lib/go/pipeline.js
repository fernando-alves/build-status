module.exports = function Pipeline(name, pipelineInstances) {
  let self = {};
  self.history = [];
  self.name = name;

  (function parseHistory() {
    self.history = pipelineInstances
      .map(pipeline => {
        return pipeline.label;
      })
      .reverse();
  })();

  return Object.freeze(self);
};
