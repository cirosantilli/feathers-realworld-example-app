// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.data) {

      if (context.method === 'update' || context.method === 'find') {
        if (context.path === 'user' && !context.result.user) {
          let result = {};
          result.user = context.result;
          result.user.token = context.params.headers.authorization;
          result.user.bio = result.user.bio ? result.user.bio : null;
          result.user.image = result.user.image ? result.user.image : null;
          delete result.user.password;
          context.result = result;
        }
      }
    }
    return context;
  };
};
