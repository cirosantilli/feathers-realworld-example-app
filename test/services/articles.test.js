const assert = require('assert');
const app = require('../../src/app');
var token;

// This test calls services directly

describe('\'articles\' service', () => {
  let user, article;

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

  it('Creates an Article', async () => {
    // Setting `provider` indicates an external request
    const params = {headers: {authorization: token}, user: user};
    token = user.user.token;
    article = await app.service('articles').create({article: {title: 'a title', description: 'adescription', body: 'abody', tagList: ['one','two','three']}}, params);

    let slug = 'a-title_';
    assert.deepEqual(article.slug.slice(0,slug.length),slug);
  });

  it('cleans up', async () => {

    user = await app.service('users').find({query: {username: user.user.username}});

    await app.service('articles').remove(article.slug);
    await app.service('users').remove(user.data[0]._id);

  });
});
