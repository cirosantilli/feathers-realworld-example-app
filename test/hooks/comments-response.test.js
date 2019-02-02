const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const commentsResponse = require('../../src/hooks/comments-response');

describe('\'comments-response\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/users', {
    // eslint-disable-next-line no-unused-vars
      async find(id) {
        return {data: [{username: 'foo', bio: 'bar',image: 'foobar', id: id}]};
      }
    });

    app.use('/dummy', {
      async find(id) {
        return id;
      }
    });

    app.service('dummy').hooks({
      after: commentsResponse()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').find({data:
      [
        {
          body: 'Really Awesome!',
          id: 2,
          userId: 1
        },
        {
          body: 'Really Awesome!',
          id: 3,
          userId: 2
        }
      ]
    });

    assert.deepEqual(result, {comments: [
      {
        author: {
          bio: 'bar',
          following: false,
          image: 'foobar',
          username: 'foo'
        },
        body: 'Really Awesome!',
        id: 2
      },
      {
        author: {
          bio: 'bar',
          following: false,
          image: 'foobar',
          username: 'foo'
        },
        body: 'Really Awesome!',
        id: 3
      }
    ]});
  });
});
