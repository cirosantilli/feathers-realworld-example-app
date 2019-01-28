// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    let article = await helpers.getArticles(context,context.id);

    if (article) {
      context.id = article.data[0]._id;
    }

    return context;
  };
};
