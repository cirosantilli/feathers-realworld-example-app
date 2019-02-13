const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const tagFind = require('../../src/hooks/tag-find');

describe('\'tag-find\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: tagFind()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test',{query: {}});

    assert.deepEqual(result, { id: 'test' });
  });
});
