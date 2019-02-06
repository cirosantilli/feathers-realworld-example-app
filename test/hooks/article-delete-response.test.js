const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const articleDeleteResponse = require('../../src/hooks/article-delete-response');

describe('\'article-delete-response\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/articlecomments', {
      /* eslint-disable no-unused-vars */
      async remove(id,query) {
        return { id };
      }
    });

    app.use('/dummy', {
      async remove(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: articleDeleteResponse()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').remove('test');

    assert.deepEqual(result, { id: 'test' });
  });
});
