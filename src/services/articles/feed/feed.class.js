/* eslint-disable no-unused-vars */

const ferrors = require('@feathersjs/errors');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = (app);
  }

  async find (params) {
    let articles = {};

    if (params.user.followingList && params.user.followingList.length > 0) {
      articles = await this.getFeed(params,params.user.followingList);
    }
    return articles;
  }

  async getFeed(params,following) {
    let thequery = {query: {$sort: {createdAt: -1}}};
    if (params.query.limit) {
      thequery.query.$limit = params.query.limit;
    }
    if (params.query.offset) {
      thequery.query.$skip = params.query.offset;
    }
    thequery.query.userId = {$in: following};
    let article = this.app.service('articles').find(thequery);

    article.catch(function () {
      throw new ferrors.NotFound('Articles not found');
    });

    return article;
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
