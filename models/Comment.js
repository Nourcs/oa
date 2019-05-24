const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
