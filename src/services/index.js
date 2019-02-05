const users = require('./users/users.service.js');
const articles = require('./articles/articles.service.js');
const user = require('./user/user.service.js');
const profiles = require('./profiles/profiles.service.js');
const follow = require('./articles/follow/follow.service.js');
const favorite = require('./articles/favorite/favorite.service.js');
const articlecomments = require('./articlecomments/articlecomments.service.js');
const comments = require('./articles/comments/comments.service.js');
const tags = require('./tags/tags.service.js');
const articlesFeed = require('./articles/feed/feed.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(articlesFeed);
  app.configure(articles);
  app.configure(user);
  app.configure(profiles);
  app.configure(follow);
  app.configure(favorite);
  app.configure(articlecomments);
  app.configure(comments);
  app.configure(tags);
};
