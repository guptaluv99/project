const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('./user.model');
const auth = require('./auth');

router.post("/register", async (req, res) => {
  try {
    var reqBody = req.body;
    var newUser = new User(reqBody);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser = await newUser.save();
    res.json(true)
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error, Please try after sometime.");
  }
});
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ mobile: req.body.mobile });
    if (!user) return res.status(400).send("No user found");

    let validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(401).send("Access denied. Incorrect Password.");

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).json({
      "token": token
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error, Please try after sometime.");
  }
});
router.get("/current", auth, async (req, res) => {
  try {
    var user = req.user;        
    user = await User.findOne({_id: ObjectId(user._id)}, {password: 0});    
    res.json({
      "user": user
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error, Please try after sometime.");
  }
});
router.delete("/logout", auth, async (req, res) => {
  try {
    res.json({ message: "Logged out successfully!" });
  } catch (e) {
    console.log("Exception in finding user:", e);
    res.status(501).send("Internal server error");
  }
});
router.post("/updateFavorites", auth, async (req, res) => {
  try {
    var thisUserId = ObjectId(req.user._id);
    var neo = req.body;
    var thisUser = await User.findOne({_id: thisUserId}, {favorites:1});
    if(thisUser.favorites && thisUser.favorites.length){
      var index = thisUser.favorites.findIndex(elem => elem.id === neo.id);
      if(index > -1) thisUser.favorites.splice(index, 1);
      else thisUser.favorites.push(neo);
    } else thisUser.favorites = [neo];
    thisUser = await thisUser.save();
    res.json(thisUser);
  } catch (e) {
    console.log("Exception in finding user:", e);
    res.status(501).send("Internal server error");
  }
});

module.exports = router;