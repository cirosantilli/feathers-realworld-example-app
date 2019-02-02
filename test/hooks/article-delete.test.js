//const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const articleDelete = require('../../src/hooks/article-delete');

describe('\'article-delete\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/articles', {
      async find(data) {
        return {data: [data]};
      },
      async get(data) {
        return {data};
      }
    });
    app.use('/dummy', {
      async get(id) {
        return { id };
      },
      async create(data) {
        return { data };
      }
    });

    app.service('dummy').hooks({
      before: articleDelete()
    });
  });

  it('runs the hook', async () => {

    await app.service('dummy').get('foo');

    //assert.deepEqual(result, { id: 'test' });
  });
});
