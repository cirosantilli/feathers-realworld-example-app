const assert = require('assert');
const app = require('../../src/app');

describe('\'articlecomments\' service', () => {
  it('registered the service', () => {
    const service = app.service('articlecomments');

    assert.ok(service, 'Registered the service');
  });
});
