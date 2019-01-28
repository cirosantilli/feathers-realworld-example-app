const assert = require('assert');
const app = require('../../src/app');

describe('\'follow\' service', () => {
  it('registered the service', () => {
    const service = app.service('follow');

    assert.ok(service, 'Registered the service');
  });
});
