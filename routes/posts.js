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

router.post("/BRXIArWSf2sCHprS2bQ4/:id/newPost", (req, res, next) => {
  let post = req.body.newPost;
  let id = req.params.id;

  User.findOne({ uid: id }).then(to => {
    User.findOne({ uid: req.body.uid }).then(from => {
      Post.create({ from, to, post }).then(response => {
        res.json(response);
      });
    });
  });
});

router.post("/BRXIArWSf2sCHprS2bQ4/:id/posts", (req, res, next) => {
  let id = req.params.id;
  User.findOne({ uid: id }).then(user => {
    Post.find({ to: user })
      .sort({ createdAt: -1 })
      .populate("from")
      .populate("to")
      .then(response => {
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
        res.json(response);
      });
  });
});

module.exports = router;
