

const tagResponse = require('../../hooks/tag-response');
const hideMethod = require('../../hooks/hide-method');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hideMethod()],
    update: [hideMethod()],
    patch: [hideMethod()],
    remove: [hideMethod()]
  },

  after: {
    all: [],
    find: [tagResponse()],
    get: [tagResponse()],
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
