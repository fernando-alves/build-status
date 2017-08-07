const should = require('should');
const Gateway = require('../../lib/go/gateway');

describe('Gateway', () => {
  describe('pipelines', () => {
    it('lists all pipelines on pipeline groups', done => {
      const client = {
        get: function(path, callback) {
          should(path).eql('/go/api/config/pipeline_groups');
          return callback(null, require('./samples/pipelineGroups'));
        }
      };

      const gateway = new Gateway(client);

      gateway.pipelines((err, pipelines) => {
        should(pipelines).eql(['coin', 'material', 'app']);
        done();
      });
    });

    it('propagates any error', done => {
      const client = {
        get: function(path, callback) {
          return callback(new Error('boom'));
        }
      };

      const gateway = new Gateway(client);

      gateway.pipelines(err => {
        should(err.message).eql('boom');
        done();
      });
    });
  });
});
