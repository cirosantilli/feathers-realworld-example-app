const assert = require('assert');
const app = require('../../src/app');

describe('\'articles\' service', () => {
  it('registered the service', () => {
    const service = app.service('articles');

    assert.ok(service, 'Registered the service');
  });
});
