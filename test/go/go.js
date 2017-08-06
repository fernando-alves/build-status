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
});
