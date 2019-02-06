/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const ArticlesSchema = new Schema({
    title: String,
    description: String,
    body: String,
    tagList: [String],
    userId: Schema.Types.ObjectId,
    slug: String,
    favoritesCount: { type: Number, default: 0},
    favoritedList: [Schema.Types.ObjectId],
    commentId: { type: Number, default: 0}
  },
  {
    timestamps: true
  });
  const Model = mongoose.model('articles', ArticlesSchema);
  return Model;
};
