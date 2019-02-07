//const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const articleDelete = require('../../src/hooks/article-delete');

describe('\'article-delete\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/articles', {
      async find(data) {
        return {data: [{userId: 'ab1',data:data}]};
      },
      async get(data) {
        return {data};
      }
    });
    app.use('/dummy', {
      async remove(id) {
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

    await app.service('dummy').remove('foo',{user: {_id: 'ab1'}});

    //assert.deepEqual(result, { id: 'test' });
  });
});
