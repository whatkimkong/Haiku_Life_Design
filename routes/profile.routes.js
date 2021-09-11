const router = require("express").Router();


// GET '/dashboard' => to logout the user (remove the session)
router.get("/dashboard", (req, res, next) => {
    res.render("paths/dashboard.hbs"); // RENDER THE VIEW // SHOW THIS VIEW
  });


module.exports = router;

