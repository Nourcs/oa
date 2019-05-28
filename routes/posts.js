var express = require("express");
var router = express.Router();

const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

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
      .limit(5)
      .then(response => {
        res.json(response);
      });
  });
});

router.post("/BRXIArWSf2sCHprS2bQ4/newComment/:id", (req, res, next) => {
  let { comment, from } = req.body;
  let postId = req.params.id;
  Comment.create({ from, comment, postId }).then(response => {
    res.json(response);
  });
});

router.post("/BRXIArWSf2sCHprS2bQ4/comments/:id", (req, res, next) => {
  let postId = req.params.id;
  Comment.find({ postId })
    .populate("from")
    .then(response => {
      res.json(response);
    });
});

router.post("/BRXIArWSf2sCHprS2bQ4/follow/:id", (req, res, next) => {
  let userId = req.params.id;
  let { currentUser } = req.body;

  User.findOneAndUpdate(
    { _id: currentUser },
    { $push: { following: userId } },
    function(error, success) {
      if (error) {
        res.json(error);
      } else {
        res.json(success);
      }
    }
  );
});

router.post("/BRXIArWSf2sCHprS2bQ4/unfollow/:id", (req, res, next) => {
  let userId = req.params.id;
  let { currentUser } = req.body;

  User.findOneAndUpdate(
    { _id: currentUser },
    { $pull: { following: userId } },
    function(error, success) {
      if (error) {
        res.json(error);
      } else {
        res.json(success);
      }
    }
  );
});
router.post("/BRXIArWSf2sCHprS2bQ4/followers/:id", (req, res, next) => {
  let userId = req.params.id;
  let { currentUser } = req.body;
  // res.json({ status: false, currentUser });
  User.findById(currentUser).then(user => {
    if (user.following.includes(userId)) {
      res.json({ following: true });
    } else {
      res.json({ following: false });
    }
  });
});

router.post("/BRXIArWSf2sCHprS2bQ4/feedPosts", (req, res, next) => {
  let { following } = req.body;
  Post.find({ to: { $in: following } })
    .sort({ createdAt: -1 })
    .populate("from")
    .populate("to")
    .then(response => {
      res.json(response);
    });
});

module.exports = router;
