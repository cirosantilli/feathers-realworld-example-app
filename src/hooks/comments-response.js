// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    let resultdata = [];
    let authors = [];
    let result = {};

    if (context.result.errors) {
      return context;
    }

    let resultdata2  = await getAuthors(context,resultdata,authors);

    if (context.method == 'find' ||  resultdata2.length > 1) {
      result.comments = resultdata2;
    } else if (resultdata2.length > 0) {
      result.comment = resultdata2[0];
    } else {
      result.comments = [];
    }

    context.result = result;
    return context;
  };
};

async function getAuthors(context,resultdata,authors) {
  let theresult = context.result;

  if (!theresult.data) {
    theresult= {};
    theresult.data = [context.result];
  }

  for (let index = 0; index < theresult.data.length; index++) {
    let comment = theresult.data[index];
    authors.push(await helpers.getAuthor(context,comment.userId));
    if (authors[index].data && authors[index].data.length) {
      comment.author = {username: authors[index].data[0].username, bio: authors[index].data[0].bio, image: authors[index].data[0].image, following: false};
      if (context.params.user) {
        comment.author.following = context.params.user.followingList.indexOf(comment.userId) != -1 ? true : false;
      }
      resultdata.push(comment);
    }
    delete comment.userId;
    delete comment.articleId;
    delete comment._id;

  }

  return resultdata;
}
