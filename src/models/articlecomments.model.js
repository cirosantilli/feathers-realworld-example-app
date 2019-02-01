/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const CommentsSchema = new Schema({
    body: String,
    articleId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    id: Number
  },
  {
    timestamps: true
  });
  const Model = mongoose.model('articlecomments', CommentsSchema);
  return Model;
};
