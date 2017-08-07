const should = require('should');
const HttpClient = require('../../lib/http/client');

describe('Http Client', () => {
  describe('configuration', () => {
    it('throws error if mandatory fields are not present', () => {
      const invalidConfig = {
        username: 'user',
        password: 'secret'
      };

      should(() => {
        new HttpClient(invalidConfig);
      }).throw();
    });
  });

  describe('get', () => {
    it('builds url based on configuration', done => {
      const config = {
        hostname: 'http://myhost',
        username: 'user',
        password: 'secret'
      };

      const requester = {
        get: function(options, done) {
          should(options.url).eql('http://user:secret@myhost/');
          done(null, {}, '{}');
        }
      };

      const client = new HttpClient(config, requester);

      client.get('', done);
    });

    it('parses response body to json', done => {
      const config = {
        hostname: 'http://myhost',
        username: 'user',
        password: 'secret'
      };

      const requester = {
        get: function(options, done) {
          done(null, {}, '{ "pipeline": "coin" }');
        }
      };

      const client = new HttpClient(config, requester);

      client.get('', (err, body) => {
        should(body.pipeline).eql('coin');
        done();
      });
    });
  });
});
