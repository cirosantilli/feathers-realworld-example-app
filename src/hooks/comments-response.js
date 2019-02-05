// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    let result = {};

    if (context.result.errors) {
      return context;
    }

    let resultdata  = await getAuthors(context);

    if (context.method == 'find' ||  resultdata.length > 1) {
      result.comments = resultdata;
    } else if (resultdata.length > 0) {
      result.comment = resultdata[0];
    } else {
      result.comments = [];
    }

    context.result = result;
    return context;
  };
};

async function getAuthors(context) {
  let resultdata = [];
  let theresult = context.result;

  if (!theresult.data) {
    theresult= {};
    theresult.data = [context.result];
  }

  let authorids = [];
  theresult.data.forEach(function(element) {
    authorids.push(element.userId);
  });

  let authors = await helpers.getAuthors(context,authorids);

  theresult.data.forEach(function(element) {
    let comment = element;
    let theauthor = authors.data.find(function(item) {
      return item._id.toString() == this.authorid;
    },{authorid: comment.userId});

    if (theauthor) {
      comment.author = {username: theauthor.username, bio: theauthor.bio, image: theauthor.image, following: false};
      if (context.params.user) {
        comment.author.following = helpers.findIndex(context.params.user.followingList,comment.userId) != -1 ? true : false;
      }
      resultdata.push(comment);
    }
    delete comment.userId;
    delete comment.articleId;
    delete comment._id;

  });

  return resultdata;
}
