const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const feathersClient = require('@feathersjs/rest-client');
const auth = require('@feathersjs/authentication-client');
const fetch = require('node-fetch');
const app = require('../../src/app');

const host = app.get('host');
const port = app.get('port');
const username = 'testclient';
const email = 'testclient@example.com';
const password = 'secret';

describe('\'tags\' service', () => {
  it('registered the service', () => {
    const service = app.service('tags');

    assert.ok(service, 'Registered the service');
  });

  //this.timeout(10000);
  let server;
  let client;

  let user,article,article2,article3,article4;

  before(async () => {

    server = app.listen(port);
    server.on('listening', async () => {
      // eslint-disable-next-line no-console
      console.log('Feathers application started on http://%s:%d', host, port);
    });

    client = await makeClient();
  });

  after(() => {
    client.logout();
    server.close();
  });

  describe('Run tests using client and server', () => {

    it('registered the service', () => {
      const service = client.service('users');
      assert.ok(service, 'Registered the client service');
    });

    it('creates a user, encrypts password, logs in', async () => {
      user = await client.service('users').create({user: {
        username: username,
        email: email,
        password: password
      }});

      // Makes sure the password got encrypted
      assert.ok(user.password !== 'secret');

    });

    it('Creates an Article with tags', async () => {
      article = await client.service('articles').create({article: {title: 'a title', description: 'adescription', body: 'abody', tagList: ['tagone','tagtwo']}},{headers: {authorization: user.user.token}});

      assert.deepEqual(article.article.tagList, ['tagone','tagtwo']);

      let tags = await client.service('tags').find();
      assert.ok(tags.tags.length === 2);
      assert.ok(tags.tags[0] === 'tagone' || tags.tags[0] === 'tagtwo');
      assert.ok(tags.tags[1] === 'tagone' || tags.tags[1] === 'tagtwo');
    });

    it('Adds another article checks for the tag order', async () => {

      article2 = await client.service('articles').create({article: {title: 'another title', description: 'adescription', body: 'abody', tagList: ['tagthree','tagtwo']}},{headers: {authorization: user.user.token}});

      assert.deepEqual(article2.article.tagList, ['tagthree','tagtwo']);

      let tags = await client.service('tags').find();
      assert.ok(tags.tags.length === 3);
      assert.ok(tags.tags[0] === 'tagtwo');
      assert.ok(tags.tags[1] === 'tagone' || tags.tags[1] === 'tagthree');
      assert.ok(tags.tags[2] === 'tagone' || tags.tags[2] === 'tagthree');
    });

    it('Adds a third article checks for the tag order', async () => {

      article3 = await client.service('articles').create({article: {title: 'a third title', description: 'adescription', body: 'abody', tagList: ['tagthree','tagtwo']}},{headers: {authorization: user.user.token}});

      assert.deepEqual(article3.article.tagList, ['tagthree','tagtwo']);

      let tags = await client.service('tags').find();
      assert.ok(tags.tags.length === 3);
      assert.ok(tags.tags[0] === 'tagtwo');
      assert.ok(tags.tags[1] === 'tagthree');
      assert.ok(tags.tags[2] === 'tagone');
    });

    it('Adds a fourth article checks for the tag order', async () => {

      article4 = await client.service('articles').create({article: {title: 'a fourth title', description: 'adescription', body: 'abody', tagList: ['tagtwo']}},{headers: {authorization: user.user.token}});

      assert.deepEqual(article4.article.tagList, ['tagtwo']);

      let tags = await client.service('tags').find();
      assert.ok(tags.tags.length === 3);
      assert.ok(tags.tags[0] === 'tagtwo');
      assert.ok(tags.tags[1] === 'tagthree');
      assert.ok(tags.tags[2] === 'tagone');
    });

    it('cleans up first article and checks tags', async () => {

      await client.service('articles').remove(article.article.slug,{headers: {authorization: user.user.token}});

      let tags = await client.service('tags').find();
      assert.ok(tags.tags.length === 2);
      assert.ok(tags.tags[0] === 'tagtwo');
      assert.ok(tags.tags[1] === 'tagthree');

    });

    it('cleans up another article and checks tags', async () => {

      await client.service('articles').remove(article2.article.slug,{headers: {authorization: user.user.token}});

      let tags = await client.service('tags').find();
      assert.ok(tags.tags.length === 2);
      assert.ok(tags.tags[0] === 'tagtwo');
      assert.ok(tags.tags[1] === 'tagthree');

    });

    it('cleans up third article and checks tags', async () => {

      await client.service('articles').remove(article3.article.slug,{headers: {authorization: user.user.token}});

      let tags = await client.service('tags').find();
      assert.ok(tags.tags.length === 1);
      assert.ok(tags.tags[0] === 'tagtwo');
    });

    it('cleans up fourth article and checks tags and cleans up user', async () => {

      await client.service('articles').remove(article4.article.slug,{headers: {authorization: user.user.token}});

      let tags = await client.service('tags').find();
      assert.ok(tags.tags.length === 0);

      let user2 = await client.service('users').find({query: {username: user.user.username},headers: {authorization: user.user.token}});
      await app.service('users').remove(user2.data[0]._id);

    });
  });
});

async function makeClient() {
  var client = feathers();
  // Configure the REST client to use 'node-fetch'
  const rest = feathersClient('http://localhost:3030');
  client.configure(rest.fetch(fetch));
  client.configure(auth({
    path: 'users/login',
    storage: localStorage()
  }));

  return client;
}

function localStorage () {
  const store = {};

  return {
    setItem (key, value) {
      store[key] = value;
    },
    getItem (key) {
      return store[key];
    },
    removeItem (key) {
      delete store[key];
    }
  };
}
