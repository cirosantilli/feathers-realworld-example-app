const assert = require('assert');
const app = require('../../src/app');

describe('\'user\' service', () => {
  let user;

  it('registered the service', () => {
    const service = app.service('user');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user, encrypts password', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };

    user = await app.service('users').create({user: {
      username: 'test',
      email: 'test@example.com',
      password: 'secret'
    }}, params);

    // Makes sure the password got encrypted
    assert.ok(user.password !== 'secret');
  });

  it('logs in correctly', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };

    user = await app.service('users/login').create({user: {
      email: 'test@example.com',
      password: 'secret'
    }}, params);

    // Make sure password has been removed
    assert.ok(!user.password);
  });

  it('gets current user', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };
    //token = user.user.token;
    user = await app.service('user').find(user, params);

    // Make sure password has been removed
    assert.ok(!user.password);
  });

  it('cleans up', async () => {

    user = await app.service('users').find({query: {username: user.username}});

    await app.service('users').remove(user.data[0]._id);

  });

});
