const mongoose = require('mongoose');

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const TagsSchema = new Schema({
    tags: [String]
  });
  const Model = mongoose.model('tags', TagsSchema);
  return Model;
};
