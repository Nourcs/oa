var express = require("express");
var router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");

router.post("/BRXIArWSf2sCHprS2bQ4/newPost", (req, res, next) => {
  let post = req.body.newPost;
  User.findOne({ uid: req.body.uid }).then(user => {
    Post.create({ from: user, to: user, post }).then(response => {
      res.json(response);
    });
  });
});

router.post("/BRXIArWSf2sCHprS2bQ4/posts", (req, res, next) => {
  User.findOne({ uid: req.body.uid }).then(user => {
    Post.find({ to: user })
      .sort({ createdAt: -1 })
      .populate("from")
      .populate("to")
      .then(response => {
        let arr = [...response];
        for (let i = 0; i < arr.length; i++) {
          User.findById(arr[i].from).then(from => {
            arr[i].push(from);
          });
        }
        // User.findById(respons);
        res.json(arr);
      });
  });
});

module.exports = router;
