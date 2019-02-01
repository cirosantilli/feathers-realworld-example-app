// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');
const ferrors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    let article = await helpers.getArticles(context,context.id);
    if (article.data && article.data.length) {
      context.id = article.data[0]._id;
    } else {
      throw new ferrors.NotFound('Article not found');
    }

    return context;
  };
};
