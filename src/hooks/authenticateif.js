// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { authenticate } = require('@feathersjs/authentication').hooks;

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.params.headers && context.params.headers.authorization) {
      let doauth = authenticate('jwt');
      return doauth(context);
    }
    return context;
  };
};
