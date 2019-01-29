// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    if (context.params.query) {
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
        let favoritedarticles = [];
        let user1 = await helpers.getAuthorByName(context,context.params.query.favorited);
        if (user1.data && user1.data.length > 0) {
          favoritedarticles = await getFavoritedArticles(context,user1.data[0]._id);
        }
        context.result = {total: favoritedarticles.total, data: favoritedarticles.data};
      }
    }

    return context;
  };
};

async function getFavoritedArticles(context,userId) {
  let thequery = {query: { favoritedList: userId }};
  if (context.params.query.$limit) {
    thequery.query.$limit = context.params.query.$limit;
  }
  if (context.params.query.$skip) {
    thequery.query.$skip =  context.params.query.$skip;
  }

  let article = context.app.service('articles').find(thequery);

  article.catch(function () {
    console.log("Promise Catch");
  });

  return article;
}
