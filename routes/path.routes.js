const router = require("express").Router();

const BlueprintModel = require("../models/Blueprint.model");
const PathModel = require("../models/Path.model");
// const StageModel = require("../models/Stage.model");

router.get("/path", (req, res, next) => {
  BlueprintModel.find().then((blueprints) => {
    res.render("paths/add-path.hbs", { blueprints });
  });
});

router.post("/paths/create", (req, res, next) => {
  // receive the information from the form
  const { blueprint_id, title, description } = req.body;
  if(!req.session.loggedInUser){
    res.redirect('/path')
    return;
  }
  const user_id = req.session.loggedInUser._id;
  // create path modeled on the selected blueprint
  BlueprintModel.findById(blueprint_id)
    .then((blueprint) => {
      return PathModel.create({ blueprint_id, title, description, user_id, type: blueprint.type, stages: blueprint.stages })
    })
    .then((freshlyCreatedPath) => {
      res.redirect(`/paths/${freshlyCreatedPath._id}`);
    })
    .catch((err) => {
      next(err)
    });
});

router.get("/paths/:id", (req, res, next) => {
  PathModel.findById(req.params.id).then((path) => {
    res.render("paths/path.hbs");
  });
});

// path for paths/path_id // grab the information from the path
// use the INDEX of the ARRAY [] if there is 1 image = stage 2, 
// 


// GET '/dashboard' => to logout the user (remove the session)
router.get("/dashboard", (req, res, next) => {
  res.render("paths/dashboard.hbs"); // RENDER THE VIEW // SHOW THIS VIEW
});

module.exports = router;
