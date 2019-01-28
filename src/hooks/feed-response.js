// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {

  return async context => {
    if (context.result.data) {
      let resultdata2  = await helpers.getAuthorsAndFavorite(context,context.result.data);
      let result = {};

      result.articles = resultdata2;
      result.articlesCount = context.result.total;
      context.result = result;
    }
    else  {
      context.result = {articles: [], articlesCount: 0};
    }

    return context;
  };
};
