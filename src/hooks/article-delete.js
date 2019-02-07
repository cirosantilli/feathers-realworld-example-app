// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');
const ferrors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    let article = await helpers.getArticles(context,context.id);

    if (article && article.data && article.data.length) {
      if (article.data[0].userId.toString() != context.params.user._id){
        throw new ferrors.Forbidden();
      }
      context.id = article.data[0]._id;
    } else {
      throw new ferrors.NotFound('Article not found');
    }

    return context;
  };
};
