const { Schema,model } = require('mongoose');

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: String,
    createdAt: { type: Date, default: Date. now },
  }
);

const Post = model('Post', postSchema);

module.exports = Post;   