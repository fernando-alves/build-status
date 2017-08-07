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
    const config = {
      hostname: 'http://myhost',
      username: 'user',
      password: 'secret'
    };

    it('builds url based on configuration', done => {
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

    it('propagates any error', done => {
      const requester = {
        get: function(options, done) {
          done(new Error('boom'));
        }
      };

      const client = new HttpClient(config, requester);

      client.get('', err => {
        should(err.message).eql('boom');
        done();
      });
    });
  });
});
