// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    if (!context.params.query) {
      context.params.query = {};
    }
    context.params.query.$sort = {createdAt: -1};

    if (context.params.query.limit) {
      context.params.query.$limit = context.params.query.limit;
      delete context.params.query.limit;
    }
    if (context.params.query.offset) {
      context.params.query.$skip = context.params.query.offset;
      delete context.params.query.offset;
    }
    if (context.params.query.tag) {
      context.params.query.tagList = context.params.query.tag;
      delete context.params.query.tag;
    }
    if (context.params.query.author) {
      let author = await helpers.getAuthorByName(context,context.params.query.author);
      if (author.data && author.data.length) {
        context.params.query.userId = author.data[0]._id;
        delete context.params.query.author;
      }
    }
    if (context.params.query.favorited) {
      let user1 = await helpers.getAuthorByName(context,context.params.query.favorited);
      if (user1.data && user1.data.length > 0) {
        delete context.params.query.favorited;
        context.params.query.favoritedList = user1.data[0]._id;
      }
    }

    return context;
  };
};
