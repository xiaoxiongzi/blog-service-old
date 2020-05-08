const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  summary: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: '',
  },
  view: {
    type: Number,
    default: 0
  },
  publish: { type: Boolean, default: false }
}, {
  versionKey: false,
  timestamps: true
});
module.exports = mongoose.model('Article', postSchema);
