const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  username: { type: String, default: null},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, default: null },
  bio: { type: String, default: null },
  bannerBackground: { type: String, default: null },
  layout: { type: String, default: null },
  buttonStyle: { type: String, default: null},
  buttonColor: { type: String, default: null },
  buttonFontColor: { type: String, default: null },
  buttonRadius: { type: String, default: null },
  font: { type: String, default: null },
  fontColor: { type: String, default: null },
  theme: { type: String, default: null },
  refreshToken: { type: String, default: null },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: String, default: null },
});

module.exports = mongoose.model('User', userSchema);
