const assert = require('assert');
const app = require('../../src/app');

describe('\'favorite\' service', () => {
  it('registered the service', () => {
    const service = app.service('favorite');

    assert.ok(service, 'Registered the service');
  });
});
