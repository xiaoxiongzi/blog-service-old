const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now(), select: false },
}, {
  versionKey: false,
});
module.exports = mongoose.model('Tag', tagSchema);
