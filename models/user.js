const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  password: { type: String, default: '', select: false },
  avatar: { type: String, default: '' },
  date: { type: Date, default: Date.now() },
  admin: { type: Boolean, default: false }
}, {
  versionKey: false,
});

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
