const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');
const articleCreate = require('../../src/hooks/article-create');

describe('\'article-create\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    // Database adapter pagination options
    const options = {
      paginate: {
        default: 10,
        max: 25
      }
    };

    // articleCreate hook uses tags service so we need a stub here
    app.use('/tags', {
      async create(data) {
        return {data};
      },
      async find(data) {
        return {data};
      }
    });

    // Register `users` and `messages` service in-memory
    app.use('/articles', memory(options));

    app.service('articles').hooks({
      before: articleCreate(app)
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('articles').create({
      article: {
        title: 'How to train your dragon',
        description: 'Ever wonder how?',
        body: 'You have to believe',
        tagList: ['reactjs', 'angularjs', 'dragons']
      }
    },
    {
      user: {_id: 1}
    });

    assert.deepEqual(result.body,'You have to believe');
    assert.deepEqual(result.commentid, 0);
    assert.deepEqual(result.description, 'Ever wonder how?');
    assert.deepEqual(result.favorited, false);
    assert.deepEqual(result.favoritedList, []);
    assert.deepEqual(result.favoritesCount, 0);
    let slug = 'How-to-train-your-dragon_';
    assert.deepEqual(result.slug.slice(0,slug.length),slug);
    assert.deepEqual(result.tagList, ['reactjs','angularjs','dragons']);
    assert.deepEqual(result.title, 'How to train your dragon');
    assert.deepEqual(result.userId, 1);

  });
});
