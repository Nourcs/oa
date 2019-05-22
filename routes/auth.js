var express = require("express");
var router = express.Router();

const User = require("../models/User");

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

router.post("/BRXIArWSf2sCHprS2bQ4/updateUser/:id", (req, res, next) => {});

module.exports = router;
