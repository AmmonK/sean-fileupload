var express = require("express");
var router = express.Router();
const sqlite = require("sqlite3").verbose();
var models = require("../models");
var multer = require("multer");
var mime = require("mime");
var crypto = require("crypto");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(
        null,
        raw.toString("hex") + Date.now() + "." + mime.extension(file.mimetype)
      );
    });
  }
});

var upload = multer({ storage: storage });

/* GET home page. */
router.get("/", function(req, res, next) {
  models.Fruit.findAll().then(fruits => res.json(fruits));
});

router.post("/", upload.single("image"), function(req, res, next) {
  console.log(req.body);
  let newFruit = new models.Fruit();
  newFruit.name = req.body.name;
  newFruit.image =
    req.protocol + "://" + req.get("host") + "/public/" + req.file.filename;
  newFruit.save().then(fruit => res.json(fruit));
});

module.exports = router;
