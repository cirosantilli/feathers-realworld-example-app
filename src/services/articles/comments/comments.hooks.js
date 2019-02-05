const { authenticate } = require('@feathersjs/authentication').hooks;

const commentsResponse = require('../../../hooks/comments-response');
const authenticateif = require('../../../hooks/authenticateif');

module.exports = {
  before: {
    all: [],
    find: [authenticateif()],
    get: [authenticateif()],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [commentsResponse()],
    get: [commentsResponse()],
    create: [commentsResponse()],
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
