const should = require('should');
const Go = require('../../lib/go/go');

describe('Go', () => {
  it('lists all pipelines', done => {
    const allPipelines = ['api', 'coin'];
    const gateway = {
      pipelines: function(done) {
        return done(null, allPipelines);
      },
      pipelineHistory: function(pipelineName, done) {
        return done(null, require('./samples/pipelineHistory'));
      }
    };

    const go = new Go(gateway);

    go.pipelines((err, pipelines) => {
      const pipelineNames = pipelines.map(pipeline => {
        return pipeline.name;
      });
      should(pipelineNames).eql(allPipelines);
      done();
    });
  });

  it('inclues pipeline history', done => {
    const allPipelines = ['coin'];
    const gateway = {
      pipelines: function(done) {
        return done(null, allPipelines);
      },
      pipelineHistory: function(pipelineName, done) {
        return done(null, require('./samples/pipelineHistory'));
      }
    };

    const go = new Go(gateway);

    go.pipelines((err, pipelines) => {
      const history = pipelines[0].history;
      const instanceLabels = history.map(pipelineInstance => {
        return pipelineInstance.label;
      });
      should(instanceLabels).eql(['1', '2']);
      done();
    });
  });
});
