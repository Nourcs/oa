const express = require("express");
const router = express.Router();
var authRoute = require("./auth");
var postsRoute = require("./posts");
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({ home: "Screen" });
});

router.post("/BRXIArWSf2sCHprS2bQ4/searchPeople", (req, res, next) => {
  let name = req.body.search;
  User.find({ displayName: new RegExp(name, "gi") }).then(result => {
    res.json(result);
  });
});

router.post("/BRXIArWSf2sCHprS2bQ4/people/:id", (req, res, next) => {
  let id = req.params.id;
  User.findOne({ uid: id }).then(result => {
    res.json(result);
  });
});

router.use("/", authRoute);
router.use("/", postsRoute);

module.exports = router;
