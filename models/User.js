const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    uid: String,
    firstName: String,
    lastName: String,
    displayName: { type: String, default: "Jon Doe" },
    email: String,
    birthdate: { type: Date, default: null },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male"
    },
    photoURL: String,
    coverURL: {
      type: String,
      default: "https://mnsearch.org/wp-content/uploads/2014/10/blank-2017.jpg"
    },
    bio: String,
    currentCity: String,
    nationality: String
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
