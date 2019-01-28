// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.data) {
      let user2 = context.data.user;
      if (user2) {
        // RealWorld -- peel off the user wrapper and add strategy if missing
        var strategy = user2.strategy;
        if (!strategy) {
          user2.strategy = "local";
        }
        context.data = user2;
      }
    }
    return context;
  };
};
