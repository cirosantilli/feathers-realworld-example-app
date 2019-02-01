// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.result) {
      let result = {};
      let author = context.result;

      if (author && author.data && author.data.length) {
        result.profile =  {
          username: author.data[0].username,
          bio: author.data[0].bio ? author.data[0].bio : null,
          image: author.data[0].image ? author.data[0].image : null,
          following: helpers.findIndex(context.params.user.followingList,author.data[0]._id) != -1 ? true : false
        };
        context.result = result;
        if (context.method == 'create') {
          context.statusCode = '200';
        }
      }
    }
    return context;
  };
};
