
const hideMethod = require('../../hooks/hide-method');

const tagFind = require('../../hooks/tag-find');

module.exports = {
  before: {
    all: [],
    find: [tagFind()],
    get: [],
    create: [hideMethod()],
    update: [hideMethod()],
    patch: [hideMethod()],
    remove: [hideMethod()]
  },

  after: {
    all: [],
    find: [],
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
