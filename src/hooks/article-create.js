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
      let tagret = await context.app.service('tags').find();

      if (tagret.tags && tagret.tags.length > 0 ) {
        tagret.tags =  Array.from(new Set(tagret.tags.concat(context.data.article.tagList)));
        await context.app.service('tags').update(tagret._id,tagret);
      } else {
        let tags = {};
        tags.tags = context.data.article.tagList;
        await context.app.service('tags').create(tags);
      }
    }

    context.data = context.data.article;

    return context;
  };
};
