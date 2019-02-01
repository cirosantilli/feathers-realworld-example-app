// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.data) {
      let user = context.data.user;

      if (user) {
        user.bio = user.bio ? user.bio : null;
        user.image = user.image ? user.image : null;
        // RealWorld -- peel off the user wrapper
        context.data = context.data.user;
        context.data.followingList = [];
      }
    }
    return context;
  };
};
