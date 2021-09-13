const router = require("express").Router();
const PathModel = require("../models/Path.model");
// const BlueprintModel = require("../models/Blueprint.model");
// const StageModel = require("../models/Stage.model");

// GET '/dashboard' => to logout the user (remove the session)
router.get("/dashboard", (req, res, next) => {
    res.render("paths/dashboard.hbs"); // RENDER THE VIEW // SHOW THIS VIEW
  });

    // GET - will be at /path

router.get('/path', (req ,res, next) => {
    res.render('paths/add-path.hbs')
  })

// GET - will be at /path/add-path
/*
router.get('/path', (req ,res, next) => {
    const { pathTypes } = req.params;
    PathModel.findById(pathTypes)
    .then((path) => res.render('paths/add-path.hbs', {path}))
    .catch((err) => console.log(err));
  })
*/

   module.exports = router;