// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.params && context.params.headers) {
      let authorize = context.params.headers.authorization;

      if (authorize) {
        let index = authorize.indexOf('Token ');
        if (index != -1) {
          context.params.headers.authorization = authorize.slice(6);
        }
      }
    }
    return context;
  };
};
