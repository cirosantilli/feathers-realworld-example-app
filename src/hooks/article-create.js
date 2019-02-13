// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    context.data.article.userId = context.params.user._id;
    context.data.article.slug = helpers.getSlug(context.data.article.title);
    context.data.article.favoritesCount = 0;
    context.data.article.favorited = false;
    context.data.article.favoritedList = [];
    context.data.article.commentid = 0;

    if (context.data.article.tagList) {
      context.data.article.tagList.forEach(async function(tag) {
        let tagret = await context.app.service('tags').find({query: {name: tag}});
        if (tagret && tagret.data && tagret.data.length) {
          tagret.data[0].popularity = tagret.data[0].popularity +1;
          await context.app.service('tags').update(tagret.data[0]._id,tagret.data[0]);
        } else {
          await context.app.service('tags').create({name: tag, popularity: 1});
        }
      });
    }
    context.data = context.data.article;

    return context;
  };
};
