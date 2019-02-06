/* eslint-disable no-unused-vars */

const helpers = require('../../../common/helpers.js');
const ferrors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async create (data, params) {
    let user1 = await helpers.getUserByName(this,params.user.username);
    let articleUpdate = {};
    articleUpdate.favoritedList = [user1.data[0]._id];
    let article = await helpers.getArticles(this,data.slug);

    if (article && article.data && article.data.length) {
      if (article.data[0].favoritedList) {
        if (helpers.findIndex(article.data[0].favoritedList,user1.data[0]._id) == -1) {
          articleUpdate.favoritedList = article.data[0].favoritedList.concat(articleUpdate.favoritedList);
        } else {
          articleUpdate.favoritedList = article.data[0].favoritedList;
        }
      }
      articleUpdate.favorited = true;
      articleUpdate.favoritesCount = articleUpdate.favoritedList.length;

      return await this.app.service('articles').patch(article.data[0]._id,articleUpdate);
    }
    throw new ferrors.NotFound('Article not found');
  }

  async remove (id, params) {
    let article = await helpers.getArticles(this,params.route.slug);

    if (article && article.data && article.data.length) {
      if (article.data[0].favoritedList) {
        let favoriteList = article.data[0].favoritedList;
        let user1 = await helpers.getUserByName(this,params.user.username);
        let index = helpers.findIndex(favoriteList,user1.data[0]._id);
        if (index != -1){
          favoriteList.splice(index,1);
        }
        let articleUpdate = {};
        articleUpdate.favorited = favoriteList.length > 0 ? true : false;
        articleUpdate.favoritedList = favoriteList;
        articleUpdate.favoritesCount = articleUpdate.favoritedList.length;
        return await this.app.service('articles').patch(article.data[0]._id,articleUpdate);
      }
    }

    throw new ferrors.NotFound('Article not found');
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
