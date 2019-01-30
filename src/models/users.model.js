const mongoose = require('mongoose');

module.exports = function (app) {
  const Schema = mongoose.Schema;
  const UsersSchema = new Schema({
    username: { type: String, index: true, unique: true },
    email: { type: String, index: true, unique: true },
    password: String,
    bio: String,
    image: String,
    followingList: [Schema.Types.ObjectId]
  });
  const Model = mongoose.model('users', UsersSchema);
  return Model;
};
