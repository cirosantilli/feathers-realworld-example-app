/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const TagsSchema = new Schema({
    name: { type: String, index: true, unique: true },
    popularity: {type: Number, default: 1}
  });

  const Model = mongoose.model('tags', TagsSchema);
  return Model;
};
