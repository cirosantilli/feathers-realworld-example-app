
const helpers = require('../common/helpers.js');

// eslint-disable-next-line no-unused-vars
module.exports = async function (req,res,next) {
  // Insert author details and format result appropriately

  let resultData  = await helpers.getAuthorsAndFavorite(res.hook,res.data.data ? res.data.data : [res.data]);

  let result = {};

  if (!(res.hook.params.query && res.hook.params.query.slug) && (res.hook.method == 'find' || resultData.length > 1)) {
    result.articles = resultData;
    result.articlesCount = res.hook.result.total ? res.hook.result.total : 0;
  } else if (resultData.length > 0) {
    result.article = resultData[0];
  }

  res.data = result;
  next();
};
