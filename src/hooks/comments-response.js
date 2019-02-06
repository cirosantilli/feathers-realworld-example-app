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

    let resultData  = await getAuthors(context);

    if (context.method == 'find' ||  resultData.length > 1) {
      result.comments = resultData;
    } else if (resultData.length > 0) {
      result.comment = resultData[0];
    } else {
      result.comments = [];
    }

    context.result = result;
    return context;
  };
};

async function getAuthors(context) {
  let resultData = [];
  let theResult = context.result;

  if (!theResult.data) {
    theResult= {};
    theResult.data = [context.result];
  }

  let authorids = [];
  theResult.data.forEach(function(element) {
    authorids.push(element.userId);
  });

  let authors = await helpers.getAuthors(context,authorids);

  theResult.data.forEach(function(element) {
    let comment = element;
    let theauthor = authors.data.find(function(item) {
      return item._id.toString() == this.authorid;
    },{authorid: comment.userId});

    if (theauthor) {
      comment.author = {username: theauthor.username, bio: theauthor.bio, image: theauthor.image, following: false};
      if (context.params.user) {
        comment.author.following = helpers.findIndex(context.params.user.followingList,comment.userId) != -1 ? true : false;
      }
      resultData.push(comment);
    }
    delete comment.userId;
    delete comment.articleId;
    delete comment._id;

  });

  return resultData;
}
