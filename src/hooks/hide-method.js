// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const errors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return context => {
    if (context.params.provider && (context.params.provider == 'external' || context.params.provider == 'rest')) {
      throw new errors.MethodNotAllowed('Method not allowed');
    }
  };
};
