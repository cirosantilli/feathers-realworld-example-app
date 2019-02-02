const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');
const profileResponse = require('../../src/hooks/profile-response');

describe('\'profile-response\' hook', () => {
  let app, user, user2;

  beforeEach(async () => {
    app = feathers();

    // Database adapter pagination options
    const options = {
      paginate: {
        default: 10,
        max: 25
      }
    };

    // Register `users` and `messages` service in-memory
    app.use('/users', memory(options));

    app.use('/profiles', {
      // eslint-disable-next-line no-unused-vars
      async get(id) {
        return {data: [{username: 'bar', bio: 'b',image: 'foobar', _id: 'bar'}]};
      }
    });

    app.service('profiles').hooks({
      after: profileResponse()
    });

    // Create a new user we can use to test with
    user = await app.service('users').create({username: 'foo', bio: 'b',image: 'foobar', id: 'foo', followingList: ['bar']});
    user2 = await app.service('users').create({username: 'foo2', bio: 'b',image: 'foobar', id: 'foo2', followingList: []});

  });

  it('runs the hook', async () => {
    const result = await app.service('profiles').get('bar',{user: {username: user.username}});

    assert.deepEqual(result, {profile: {username: 'bar', bio: 'b',image: 'foobar', following: true}});

    const result2 = await app.service('profiles').get('bar',{user: {username: user2.username}});

    assert.deepEqual(result2, {profile: {username: 'bar', bio: 'b',image: 'foobar', following: false}});
  });
});
