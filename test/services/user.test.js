const assert = require('assert');
const app = require('../../src/app');
//var token;

/*function addInAuthenticationHook() {
  return async context => {
    if (context.params) {
      context.params.headers = {authorization: token};
      // eslint-disable-next-line no-console
      console.log(context);
    }
    return context;
  };
}*/

describe('\'user\' service', () => {
  let user;

  it('registered the service', () => {
    const service = app.service('user');

    assert.ok(service, 'Registered the service');
  });

  //app.service('user').hooks({
  //  before: addInAuthenticationHook()
  //});

  it('creates a user, encrypts password', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };

    user = await app.service('users').create({user: {
      username: 'test',
      email: 'test@example.com',
      password: 'secret'
    }}, params);

    // eslint-disable-next-line no-console
    console.log(user);
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

    // eslint-disable-next-line no-console
    console.log(user);

    // Make sure password has been removed
    assert.ok(!user.password);
  });

  it('gets current user', async () => {
    // Setting `provider` indicates an external request
    const params = { provider: 'rest' };
    //token = user.user.token;
    user = await app.service('user').find(user, params);

    // eslint-disable-next-line no-console
    console.log(user);

    // Make sure password has been removed
    assert.ok(!user.password);
  });

  it('cleans up', async () => {
    // Setting `provider` indicates an external request

    user = await app.service('users').find({query: {username: user.username}});

    // eslint-disable-next-line no-console
    console.log(user);
    await app.service('users').remove(user.data[0]._id);

  });

});
