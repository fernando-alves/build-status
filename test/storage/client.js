const should = require('should');
const Client = require('../../lib/storage/client');

describe('Storage', () => {
  const host = 'someUrl';

  const GatewayBuilder = function() {
    let self = {};
    let client = {};

    self.onConnect = function(callback) {
      client.connect = callback;
    };

    self.build = function() {
      return Object.freeze(client);
    };

    return Object.freeze(self);
  };

  describe('starting', () => {
    it('opens connection to configured server', done => {
      const builder = new GatewayBuilder();
      builder.onConnect((address, callback) => {
        should(address).eql(host);
        callback();
      });

      const client = new Client({ host: host, gateway: builder.build() });
      client.start(done);
    });

    it('propagates any error', done => {
      const builder = new GatewayBuilder();
      builder.onConnect((address, callback) => {
        callback(new Error('boom'));
      });

      const client = new Client({ host: host, gateway: builder.build() });
      client.start(err => {
        should(err.message).eql('boom');
        done();
      });
    });
  });
});
