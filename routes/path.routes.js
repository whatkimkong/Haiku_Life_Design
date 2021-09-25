const router = require("express").Router();

const BlueprintModel = require("../models/Blueprint.model");
const PathModel = require("../models/Path.model");
// const StageModel = require("../models/Stage.model");

// ... all imports stay unchanged
// ********* require fileUploader in order to use it *********
const imageUploader = require('../config/cloudinary.config');

//... all the routes stay unchanged


router.get("/path", (req, res, next) => {
  BlueprintModel.find().sort({type: 1}).then((blueprints) => {
    res.render("paths/add-path.hbs", { blueprints });
  });
});

router.post("/paths/create", (req, res, next) => {
  // receive the information from the form
  const { blueprint_id, title_id, description } = req.body;
  if(!req.session.loggedInUser){
    res.redirect('/dashboard')
    return;
  }
  const user_id = req.session.loggedInUser._id;
  // create path modeled on the selected blueprint
  BlueprintModel.findById(blueprint_id)
    .then((blueprint) => {
      return PathModel.create({ blueprint_id, title_id, description, user_id, type: blueprint.type, stages: blueprint.stages })
    })
    .then((freshlyCreatedPath) => {
      res.redirect(`/paths/${freshlyCreatedPath._id}`);
    })
    .catch((err) => {
      next(err)
    });
});

router.get("/paths/:id", (req, res, next) => {
  PathModel.findById(req.params.id).populate("stages")
  .then((path) => {
    const stage = path.stages[path.images.length]
    const isFinished = !stage;
    res.render("paths/path.hbs", { stage, path, isFinished });
  });
});

router.post("/paths/:id", imageUploader.single('imageUrl') ,(req, res, next) => {
  const imageUrl = req.file.path;
  PathModel.findByIdAndUpdate(req.params.id, { $push: { images: imageUrl }}, { new: true })
  .then((freshlyUpdatedPath) => {
    console.log(freshlyUpdatedPath)
    res.redirect(`/paths/${freshlyUpdatedPath._id}`);
  })
  .catch((err) => {
    console.log(err, "Take a picture of your work to advance to the next step!");
  });
}); 

// path for paths/path_id // grab the information from the path
// use the INDEX of the ARRAY [] if there is 1 image = stage 2, 
// 

// GET '/dashboard' => to logout the user (remove the session)
router.get("/dashboard", (req, res, next) => {
  PathModel.find().populate()
  .then((paths) => {
  res.render("paths/dashboard.hbs", {paths}); // RENDER THE VIEW // SHOW THIS VIEW
  });
});

router.post('/paths/:id/delete', (req, res) => {
  const { id } = req.params;
  PathModel.findByIdAndDelete(id)
      .then(() => { 
          res.redirect(`/dashboard`);
       })
      .catch((err) => {
          console.log(err);
      });
})

module.exports = router;
