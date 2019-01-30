var slug = require('slug');

function getSlug(title) {
  return slug(title) + "_" + getAnId();
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
    console.log("Promise Catch");
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
    console.log("Promise Catch");
  });

  return author;
}

async function getAuthorsAndFavorite(context,thelist) {
  let resultdata = [];
  let authors = [];

  for (let index = 0; index < thelist.length; index++) {
    let article = thelist[index];
    authors.push(await getAuthor(context,article.userId));
    if (authors[index].data && authors[index].data.length) {
      article.author = {username: authors[index].data[0].username, bio: authors[index].data[0].bio ? authors[index].data[0].bio : null, image: authors[index].data[0].image ? authors[index].data[0].image : null, following: false};
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
    console.log("Promise Catch");
  });

  return article;
}


function findIndex(theList,theElement) {
  return theList.findIndex(function(element) {return element.toString() == this.tofind;},{tofind: theElement});
}

module.exports.getAuthor = getAuthor;
module.exports.getAuthorsAndFavorite = getAuthorsAndFavorite;
module.exports.getAuthorByName = getAuthorByName;
module.exports.getUserByName = getUserByName;
module.exports.getArticles = getArticles;
module.exports.getSlug = getSlug;
module.exports.getAnId = getAnId;
module.exports.findIndex = findIndex;
