// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    if (context.data) {
      context.result.user = {
        email: context.data.email,
        token: null,
        username: context.data.username,
        bio: null,
        image: null
      };
      delete context.result.username;
      delete context.result.email;
      delete context.result._id;
      delete context.result.followingList;
      delete context.result.image;
      delete context.result.bio;
    }
    return context;
  };
};
