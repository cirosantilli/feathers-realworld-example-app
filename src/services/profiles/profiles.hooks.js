const { authenticate } = require('@feathersjs/authentication').hooks;

const profileResponse = require('../../hooks/profile-response');

const authenticateif = require('../../hooks/authenticateif');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [authenticateif()],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [profileResponse()],
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
