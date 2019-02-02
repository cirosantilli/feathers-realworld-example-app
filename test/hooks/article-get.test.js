const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const articleGet = require('../../src/hooks/article-get');

describe('\'article-get\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/articles', {
      async find(data) {
        return {data: [{_id: data.query.slug}]};
      }

    });

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: articleGet()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');

    assert.deepEqual(result, { id: 'test' });
  });
});
