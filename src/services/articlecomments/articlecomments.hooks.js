const { authenticate } = require('@feathersjs/authentication').hooks;

const hideMethod = require('../../hooks/hide-method');

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt'),hideMethod()],
    patch: [authenticate('jwt'),hideMethod()],
    remove: [authenticate('jwt')]
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
