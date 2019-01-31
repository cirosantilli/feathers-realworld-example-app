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

  async find (params) {

    let article = await helpers.getArticles(this,params.query.slug);

    if (article && article.data && article.data.length) {
      return this.app.service('articlecomments').find({
        query: {
          articleId: article.data[0]._id
        }
      });
    }
    throw new ferrors.NotFound("Article: " + params.query.slug + " not found");
  }

  async get (id, params) {

    let article = await helpers.getArticles(this,params.query.slug);

    if (article && article.data && article.data.length) {
      return this.app.service('articlecomments').find({
        query: {
          articleId: article.data[0]._id,
          id: id
        }
      });
    }
    throw new ferrors.NotFound("Article: " + params.query.slug + " not found");
  }

  async create (data, params) {

    let article = await helpers.getArticles(this,data.slug);

    if (article && article.data && article.data.length) {
      let comment = { body: data.comment.body};
      comment.articleId = article.data[0]._id;
      comment.userId = params.user._id;
      comment.id = article.data[0].commentid ? article.data[0].commentid + 1 : 1;
      let articlenew = {commentid: comment.id};

      let articlepatched = await this.app.service('articles').patch(article.data[0]._id,articlenew);
      return this.app.service('articlecomments').create(comment);
    }
    throw new ferrors.NotFound("Article: " + data.slug + " not found");
  }

  async remove (id, params) {
    let thequery = {
      query: {
        slug: params.route.slug
      }
    };
    let article = await this.app.service("articles").find(thequery);

    if (article && article.data && article.data.length) {
      let comment = await this.app.service('articlecomments').find({
        query: {
            articleId: article.data[0]._id,
            id: parseInt(id)
        }
      });

      if (comment.data && comment.data.length > 0) {
          return this.app.service('articlecomments').remove(comment.data[0]._id);
      }
    }

    throw new ferrors.NotFound("Comment not found");
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
