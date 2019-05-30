var express = require("express");
var router = express.Router();

const User = require("../models/User");

router.get("/users", (req, res, next) => {
  User.find()
    .limit(10)
    .then(response => {
      res.json(response);
    });
});

router.post("/BRXIArWSf2sCHprS2bQ4/newUser", (req, res, next) => {
  let { email, uid, photoURL, displayName, firstName, lastName } = req.body;
  User.findOne({ uid }).then(user => {
    if (user) {
      res.json(user);
    } else {
      User.create({
        email,
        uid,
        photoURL,
        displayName,
        firstName,
        lastName
      }).then(response => {
        res.json(response);
      });
    }
  });
});

router.post("/BRXIArWSf2sCHprS2bQ4/updateUser/:id", (req, res, next) => {
  let { nationality, currentCity } = req.body;
  User.findByIdAndUpdate(req.params.id, { nationality, currentCity }).then(
    user => {
      res.json(user);
    }
  );
});

router.post("/BRXIArWSf2sCHprS2bQ4/community", (req, res, next) => {
  let { nationality, currentCity } = req.body;
  User.find({ nationality, currentCity })
    .limit(10)
    .then(users => {
      res.json(users);
    });
});

module.exports = router;
