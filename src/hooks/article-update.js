// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');
const ferrors = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    let article = await helpers.getArticles(context,context.id);

    if (!article.data || ! article.data.length){
      throw new ferrors.NotFound('Article not found');
    }
    if (article.data[0].userId.toString() != context.params.user._id){
      throw new ferrors.Forbidden();
    }

    if (context.data.article.title && context.data.article.title != article.data[0].title) {
      context.data.article.slug = helpers.getSlug(context.data.article.title);
    }

    article = await patchArticle(context,article.data[0]._id,context.data.article);
    context.result = {data: [article]};

    return context;
  };
};

function patchArticle(context,id,articlenew) {
  let article = context.app.service('articles').patch(id,articlenew);
  article.catch(function () {
    throw new ferrors.NotFound('Article not updated');
  });

  return article;
}
