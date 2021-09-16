const router = require("express").Router();
const PathModel = require("../models/Path.model");
const BlueprintModel = require("../models/Blueprint.model");
// const StageModel = require("../models/Stage.model");

// GET '/dashboard' => to logout the user (remove the session)
router.get("/dashboard", (req, res, next) => {
    res.render("paths/dashboard.hbs"); // RENDER THE VIEW // SHOW THIS VIEW
  });




  

router.get('/path', (req ,res, next) => {
    BlueprintModel.find().then((blueprints) => {
      res.render('paths/add-path.hbs', { blueprints })
    })
  })

router.post('/path', (req ,res, next) => {
    const { blueprint_id, title, description } = req.body;
    PathModel.create({ blueprint_id, title, description })
      .then((freshlyCreatedPath) => {
          return PathModel.findByIdAndUpdate(req.params.id , { $push: { stages: freshlyCreatedPath._id }}, { new: true});
      })
      .then((freshlyUpdatedPath) => {
          res.redirect(`/paths/${freshlyUpdatedPath._id}/path`)
      })
      .catch((err) => console.log(err));
})

router.get("/paths/:id/path", (req, res, next) => {
  res.render("paths/path.hbs", { pathId: req.params.id });
});









// NEXT // create a path with correct info // POST route for this >> for Path creation // 

   module.exports = router;