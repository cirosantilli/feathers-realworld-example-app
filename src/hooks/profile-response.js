// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');
const ferrors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.result) {
      let result = {};

      if (context.result.data.length > 0) {
        let userss = context.result.data[0];
        let following = false;
        if (context.params.user) {
          let author = await helpers.getAuthorByName(context,context.params.user.username);
          if (author.data && author.data.length) {
            if (helpers.findIndex(author.data[0].followingList,userss._id) != -1) {
              following = true;
            }
          }
        }
        //let following = Array.isArray(userss.following) ? true > 0 : false;
        result.profile = {
          username: userss.username,
          bio: userss.bio ? userss.bio : null,
          image: userss.image ? userss.image : null,
          following: following
        };
        context.result = result;
      } else {
        throw new ferrors.NotFound('User not found');
      }
    }

    return context;
  };
};
