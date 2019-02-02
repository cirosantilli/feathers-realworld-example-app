const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const articleUpdate = require('../../src/hooks/article-update');

describe('\'article-update\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/articles', {
      async find(data) {
        return {data: [{_id: 1,title: data}]};
      },
      async patch(id,data) {
        return data;
      }
    });

    app.use('/dummy', {
      async update(id,data) {
        return { data };
      }
    });

    app.service('dummy').hooks({
      before: articleUpdate()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').update(1,{
      article: {
        title: 'How to train your dragon',
        description: 'Ever wonder how?',
        body: 'You have to believe'
      }
    });
    assert.deepEqual(result.data[0].body,'You have to believe');
    assert.deepEqual(result.data[0].description, 'Ever wonder how?');
    let slug = 'How-to-train-your-dragon_';
    assert.deepEqual(result.data[0].slug.slice(0,slug.length),slug);
    assert.deepEqual(result.data[0].title, 'How to train your dragon');
  });
});
