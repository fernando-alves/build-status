const should = require('should');
const Go = require('../../lib/go/go');

describe('Go', () => {
  describe('Configuration', () => {
    it('throws error if mandatory fields are not present', () => {
      const invalidConfig = {
        username: 'user',
        password: 'secret'
      };

      should(() => {
        new Go(invalidConfig);
      }).throw();
    });
  });

  it('lists all pipelines', done => {
    const config = {
      hostname: 'localhost',
      username: 'user',
      password: 'password'
    };
    const allPipelines = ['api', 'coin'];
    const gateway = {
      pipelines: function(done) {
        return done(null, allPipelines);
      }
    };

    const go = new Go(config, gateway);

    go.pipelines((err, pipelines) => {
      should(pipelines).eql(allPipelines);
      done();
    });
  });
});
