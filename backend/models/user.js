const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  username: { type: String, default: null},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: {type: String, default: null},
  bio: {type: String, default: null},
  bannerBackground: {type: String, default: null},
});

module.exports = mongoose.model('User', userSchema);
