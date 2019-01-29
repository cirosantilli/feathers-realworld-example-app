
const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = async function (req,res,next) {
  // Insert author details and format result appropriately

  let resultdata2  = await helpers.getAuthorsAndFavorite(res.hook,res.data.data ? res.data.data : [res.data]);

  let result = {};

  if (!(res.hook.params.query && res.hook.params.query.slug) && (res.hook.method == "find" || resultdata2.length > 1)) {
    result.articles = resultdata2;
    result.articlesCount = res.hook.result.total ? res.hook.result.total : 0;
  } else if (resultdata2.length > 0) {
    result.article = resultdata2[0];
  }

  res.data = result;
  next();
};
