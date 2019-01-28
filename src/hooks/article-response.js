// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    // Short circuit this response hook if internal call
    if (context.params.donotrunarticleresponse) {
      return context;
    }

    // This little if statement is for /articles/:slug/favorite
    if (!context.result.data && context.result.article) {
      context.result = context.result.article;
    }

    let resultdata2  = await helpers.getAuthorsAndFavorite(context,context.result.data ? context.result.data : [context.result]);

    let result = {};

    if (!(context.params.query && context.params.query.slug) && (context.method == "find" || resultdata2.length > 1)) {
      result.articles = resultdata2;
      result.articlesCount = context.result.total ? context.result.total : 0;
    } else if (resultdata2.length > 0) {
      result.article = resultdata2[0];
    }

    context.result = result;
    return context;
  };
};
