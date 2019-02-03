const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const feathersClient = require('@feathersjs/rest-client');
const auth = require('@feathersjs/authentication-client');
const fetch = require('node-fetch');
const app = require('../../src/app');

const host = app.get('host');
const port = app.get('port');
const email = 'testclient@example.com';
const password = 'secret';

// This test uses a feathers rest client for full round trip testing.

describe('\'articles\' service - client', () => {

  it('registered the service', () => {
    const service = app.service('user');

    assert.ok(service, 'Registered the service');
  });

  //this.timeout(10000);
  let server;
  let client;

  let user,article;

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
        username: 'testclient',
        email: 'testclient@example.com',
        password: 'secret'
      }});

      // Makes sure the password got encrypted
      assert.ok(user.password !== 'secret');

      user = await client.service('users/login').create({user: {
        email: email,
        password: password
      }});

      /*user = await client.authenticate({
        strategy: 'local',
        email,
        password
      });*/

    });

    it('Creates an Article', async () => {
      article = await client.service('articles').create({article: {title: 'a title', description: 'adescription', body: 'abody', tagList: ['one','two','three']}},{headers: {authorization: user.user.token}});

      let slug = 'a-title_';
      assert.deepEqual(article.article.slug.slice(0,slug.length),slug);

      article = await app.service('articles').get(article.article.slug,{headers: {authorization: user.user.token}});

      assert.deepEqual(article.slug.slice(0,slug.length),slug);

    });

    it('cleans up', async () => {

      await app.service('articles').remove(article.slug,{headers: {authorization: user.user.token}});

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
