const router = require("express").Router();
const UserModel = require("../models/User.model");

router.get("/settings", (req, res, next) => {
      res.render("profile/settings.hbs"); // find the information of this current user !! <3 
});

module.exports = router;

