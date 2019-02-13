// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.params.query.limit) {
      context.params.query.$limit = context.params.query.limit;
      delete context.params.query.limit;
    }
    if (context.params.query.offset) {
      context.params.query.$skip = context.params.query.offset;
      delete context.params.query.offset;
    }
    context.params.query.$sort = {popularity: -1};
    return context;
  };
};
