/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  const Schema = mongoose.Schema;
  const UsersSchema = new Schema({
    username: { type: String, index: true, unique: true, required: [true, 'can\'t be blank'], match: [/^[a-zA-Z0-9_-]+$/, 'is invalid'] },
    email: { type: String, index: true, unique: true, required: [true, 'can\'t be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'] },
    password: String,
    bio: String,
    image: String,
    followingList: [Schema.Types.ObjectId]
  });
  const Model = mongoose.model('users', UsersSchema);
  return Model;
};
