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

    if (params.user.followingList) {
      let authors = await this.getAuthors(params.user.followingList);
      if (authors) {
        let followers = [];
        authors.data.forEach(author => {
          followers.push(author._id);
        });
        if (followers.length > 0) {
          articles = await this.getFeed(params,followers);
        }
      }
    }
    return articles;
  }

  async getAuthors(authornames) {
    let author =  this.app.service('users').find({
      query: {
        _id: {
          $in: authornames
        }
      }
    });
    author.catch(function () {
      throw new ferrors.NotFound('Author not found');
    });

    return author;
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
