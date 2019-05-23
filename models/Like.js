const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }
  },
  {
    timestamps: true
  }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
