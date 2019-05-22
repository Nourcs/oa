const express = require("express");
const router = express.Router();
var authRoute = require("./auth");
var postsRoute = require("./posts");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json({ home: "Screen" });
});

router.use("/", authRoute);
router.use("/", postsRoute);

module.exports = router;
