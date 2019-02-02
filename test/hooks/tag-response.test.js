const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const tagResponse = require('../../src/hooks/tag-response');

describe('\'tag-response\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
    // eslint-disable-next-line no-unused-vars
      async get(id) {
        return {data: [{tags: ['foo','bar'] }]};
      }
    });

    app.service('dummy').hooks({
      after: tagResponse()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');

    assert.deepEqual(result, {tags: ['foo','bar'] });
  });
});
