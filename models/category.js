const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: String,
  date: { type: Date, default: Date.now(), select: false },
}, {
  versionKey: false,
});

module.exports = mongoose.model('Category', categorySchema);
