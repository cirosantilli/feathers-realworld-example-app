const { authenticate } = require('@feathersjs/authentication').hooks;
const articleResponse = require('../../../hooks/article-response');

const feedResponse = require('../../../hooks/feed-response');

module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [feedResponse()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
