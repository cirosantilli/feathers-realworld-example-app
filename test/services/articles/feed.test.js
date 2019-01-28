const assert = require('assert');
const app = require('../../../src/app');

describe('\'articles/feed\' service', () => {
  it('registered the service', () => {
    const service = app.service('articles/feed');

    assert.ok(service, 'Registered the service');
  });
});
