var express = require("express");
var router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");

router.post("/BRXIArWSf2sCHprS2bQ4/likes/:id", (req, res, next) => {
  let id = req.params.id;
  Like.find({ postId: id }).then(response => {
    res.json({ total: response.length });
  });
});

router.post(
  "/BRXIArWSf2sCHprS2bQ4/currentUserLiked/:id/:postId",
  (req, res, next) => {
    let id = req.params.id;
    let postId = req.params.postId;
    User.findOne({ uid: id }).then(user => {
      Like.findOne({ from: user._id, postId }).then(response => {
        if (response) {
          res.json({ liked: true });
        } else {
          res.json({ liked: false });
        }
      });
    });
  }
);

router.post("/BRXIArWSf2sCHprS2bQ4/incLike/:id", (req, res, next) => {
  let id = req.params.id;
  Like.findOne({ postId: id }).then(like => {
    if (!like) {
      Like.create({ postId: id, from: req.body.from })
        .then(response => {
          res.json(response);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      res.json({ res: null });
    }
  });
});

router.post("/BRXIArWSf2sCHprS2bQ4/decLike/:id", (req, res, next) => {
  let id = req.params.id;
  Like.findOneAndDelete({ postId: id }).then(response => {
    res.json(response);
  });
});

module.exports = router;
