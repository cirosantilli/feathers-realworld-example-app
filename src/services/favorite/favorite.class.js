/* eslint-disable no-unused-vars */

const helpers = require('../../common/helpers.js');
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
    let articleupdate = {};
    articleupdate.favoritedList = [user1.data[0]._id];
    let article = await helpers.getArticles(this,data.slug);

    if (article && article.data && article.data.length) {
      if (article.data[0].favoritedList) {
        if (helpers.findIndex(article.data[0].favoritedList,user1.data[0]._id) == -1) {
          articleupdate.favoritedList = article.data[0].favoritedList.concat(articleupdate.favoritedList);
        } else {
          articleupdate.favoritedList = article.data[0].favoritedList;
        }
      }
      articleupdate.favorited = true;
      articleupdate.favoritesCount = articleupdate.favoritedList.length;

      return await this.app.service('articles').patch(article.data[0]._id,articleupdate);
    }
    throw new ferrors.NotFound('Article not found');
  }

  async remove (id, params) {
    let article = await helpers.getArticles(this,params.route.slug);

    if (article && article.data && article.data.length) {
      if (article.data[0].favoritedList) {
        let favoritelist = article.data[0].favoritedList;
        let user1 = await helpers.getUserByName(this,params.user.username);
        let index = helpers.findIndex(favoritelist,user1.data[0]._id);
        if (index != -1){
          favoritelist.splice(index,1);
        }
        let articleupdate = {};
        articleupdate.favorited = favoritelist.length > 0 ? true : false;
        articleupdate.favoritedList = favoritelist;
        articleupdate.favoritesCount = articleupdate.favoritedList.length;
        return await this.app.service('articles').patch(article.data[0]._id,articleupdate);
      }
    }

    throw new ferrors.NotFound('Article not found');
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
