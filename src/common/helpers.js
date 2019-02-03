const slug = require('slug');
const ferrors = require('@feathersjs/errors');

function getSlug(title) {
  return slug(title) + '_' + getAnId();
}

function getAnId() {
  return Math.random().toString(36).substr(2, 9);
}

function getAuthor(context,userId) {
  let author =   context.app.service('users').find({
    query: {
      _id: userId
    }
  });
  author.catch(function () {
    throw new ferrors.NotFound('Author not found');
  });

  return author;
}

function getAuthorByName(context,username) {
  return getUserByName(context,username);
}

function getUserByName(context,username) {
  let author = context.app.service('users').find({
    query: {
      username: username
    }
  });
  author.catch(function () {
    throw new ferrors.NotFound('User not found');
  });

  return author;
}

function getAuthors(context,authorids) {

  let authors =   context.app.service('users').find({
    query: {
      _id: {
        $in: authorids
      }
    }
  });
  authors.catch(function () {
    throw new ferrors.NotFound('Author not found');
  });

  return authors;
}

async function getAuthorsAndFavorite(context,thelist) {
  let resultdata = [];

  let authorids = [];
  thelist.forEach(function(element) {
    authorids.push(element.userId);
  });

  let authors = await getAuthors(context,authorids);

  for (let index = 0; index < thelist.length; index++) {
    let article = thelist[index];

    let theauthor = authors.data.find(function(element) {
      return element._id.toString() == this.authorid;
    },{authorid: article.userId});

    if (theauthor) {
      article.author = {username: theauthor.username, bio: theauthor.bio ? theauthor.bio : null, image: theauthor.image ? theauthor.image : null, following: false};
      article.favorited = false;
      if (context.params.user) {
        article.author.following = findIndex(context.params.user.followingList,article.userId) != -1 ? true : false;
        article.favorited = article.favoritedList && findIndex(article.favoritedList,context.params.user._id) != -1 ? true : false;
      }
      delete article.favoritedList;
      delete article.commentid;
      resultdata.push(article);
    }
  }

  return resultdata;
}

function getArticles(context,theslug) {

  let article =   context.app.service('articles').find({
    query: {
      slug: theslug
    }
  });
  article.catch(function () {
    throw new ferrors.NotFound('Article not found');
  });

  return article;
}


function findIndex(theList,theElement) {
  return theList.findIndex(function(element) {return element.toString() == this.tofind;},{tofind: theElement});
}

module.exports.getAuthor = getAuthor;
module.exports.getAuthors = getAuthors;
module.exports.getAuthorsAndFavorite = getAuthorsAndFavorite;
module.exports.getAuthorByName = getAuthorByName;
module.exports.getUserByName = getUserByName;
module.exports.getArticles = getArticles;
module.exports.getSlug = getSlug;
module.exports.getAnId = getAnId;
module.exports.findIndex = findIndex;
