module.exports = function Pipeline(name, history) {
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

    const latestScheuledJob = stages => {
      const jobs = stages.reduce((jobs, stage) => {
        return jobs.concat(stage.jobs);
      }, []);

      const scheduledTimestamps = jobs.map(job => {
        return job.scheduled_date;
      });
      return Math.max.apply(null, scheduledTimestamps);
    };

    self.history = history
      .map(pipeline => {
        return {
          label: pipeline.label,
          result: pipelineResult(pipeline.stages),
          scheduledAt: latestScheuledJob(pipeline.stages)
        };
      })
      .reverse();
  })();

  return Object.freeze(self);
};
