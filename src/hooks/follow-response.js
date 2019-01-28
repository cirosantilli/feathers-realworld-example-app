// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.result) {
      let result = {};

      let userss = context.result;

      let author = await helpers.getAuthorByName(context,context.params.route.username);
      if (author && author.data && author.data.length) {
        result.profile =  {
          username: userss.username,
          bio: userss.bio ? userss.bio : null,
          image: userss.image ? userss.image : null,
          following: userss.followingList.indexOf(author.data[0]._id) != -1 ? true : false
        };
        context.result = result;
        if (context.method == "create") {
          context.statusCode = "200";
        }
      }
    }
    return context;
  };
};
