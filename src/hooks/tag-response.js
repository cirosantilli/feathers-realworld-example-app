// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.result) {

      if (context.result.data.length > 0) {
        context.result = context.result.data[0];
      } else {
        context.result = {tags: []};
      }

    }
    return context;
  };
};
