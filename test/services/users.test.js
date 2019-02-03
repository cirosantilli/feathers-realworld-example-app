const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {
  let user,user2;

  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user, encrypts password', async () => {
    user = await app.service('users').create({user: {
      username: 'test',
      email: 'test@example.com',
      password: 'secret'
    }});

    // Makes sure the password got encrypted
    assert.ok(user.password !== 'secret');
  });

  it('removes password for external requests', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };

    user2 = await app.service('users').create({user: {
      username: 'test2',
      email: 'test2@example.com',
      password: 'secret'
    }}, params);

    // Make sure password has been removed
    assert.ok(!user2.password);
  });
  it('logs in correctly', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };

    user2 = await app.service('users/login').create({user: {
      email: 'test2@example.com',
      password: 'secret'
    }}, params);

    // Make sure password has been removed
    assert.ok(!user2.password);
  });

  it('cleans up', async () => {

    user = await app.service('users').find({query: {username: user.user.username}});
    user2 = await app.service('users').find({query: {username: user2.user.username}});

    await app.service('users').remove(user.data[0]._id);
    await app.service('users').remove(user2.data[0]._id);

  });
});
