// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    if (context.data) {
      let user = {
        email: context.data.email,
        token: context.result.accessToken,
        username: context.result.username ? context.result.username : context.params.user.username,
        bio: context.params.user.bio ? context.params.user.bio : null,
        image: context.params.user.image ? context.params.user.image : null
      };

      let result = {};
      result.user = user;
      context.result = result;
    }

    return context;
  };
};
