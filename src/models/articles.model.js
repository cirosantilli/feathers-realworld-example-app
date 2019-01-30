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
    favoritesCount: Number,
    favoritedList: [Schema.Types.ObjectId],
    commentid: { type: Number, default: 0}
  },
  {
    timestamps: true
  });
  const Model = mongoose.model('articles', ArticlesSchema);
  return Model;
};
