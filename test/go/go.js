const should = require('should');
const Go = require('../../lib/go/go');

describe('Go', () => {
  it('lists all pipelines', done => {
    const allPipelines = ['api', 'coin'];
    const gateway = {
      pipelines: function(done) {
        return done(null, allPipelines);
      }
    };

    const go = new Go(gateway);

    go.pipelines((err, pipelines) => {
      should(pipelines).eql(allPipelines);
      done();
    });
  });
});
