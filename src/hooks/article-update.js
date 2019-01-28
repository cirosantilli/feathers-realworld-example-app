// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    let article = await helpers.getArticles(context,context.id);

    if (!article.data || ! article.data.length){
      return context;
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
  let article = context.app.service('articles').patch(id,articlenew,{donotrunarticleresponse: true});
  article.catch(function () {
    console.log("Promise Catch");
  });

  return article;
}
