const router = require("express").Router();
const BlueprintModel = require("../models/Blueprint.model");
// const PathModel = require("../models/Path.model");
const StageModel = require("../models/Stage.model");

// GET - will be at /blueprint
router.get("/blueprint", (req, res, next) => {
  res.render("admin/blueprint.hbs");
});

//then we CREATE a post model -- because we want to send it to the DB?
router.post("/blueprint", (req, res, next) => {
  const { type, description, title } = req.body;
  BlueprintModel.create({ type, description, title }) // have to first be destructed FROM req.body
    .then((freshlyCreatedBlueprint) =>
      res.redirect(`/blueprint/${freshlyCreatedBlueprint._id}/stage`)
    )
    .catch((err) => console.log(err));
});

router.get("/blueprint/:id/stage", (req, res, next) => {
  // put the view of the stage form here
  res.render("admin/stage.hbs", { blueprintId: req.params.id });
});

router.post("/blueprint/:id/stage", (req, res, next) => {
  const { title, description, tip } = req.body;
  StageModel.create({ title, description, tip })
        .then((freshlyCreatedStage) => {
            return BlueprintModel.findByIdAndUpdate(req.params.id , { $push: { stages: freshlyCreatedStage._id }}, { new: true});
        })
        .then((freshlyUpdatedBlueprint) => {
            res.redirect(`/blueprint/${freshlyUpdatedBlueprint._id}/stage`)
        })
        .catch((err) => console.log(err));
});

// FOR THE ABOVE: PROCESS: create the stage
  // Stage.create...
  // use the stage already created and push it into the blueprint stages array
  // Blueprint.finByIdAndUpdate(blueprintId, { })
  // res.redirect(`/blueprint/:id/stage`), {freshlyCreatedStage})
  //.push(blueprintId);
  // in the stage thing we will have BUTTON either make another stage or finish! Stage VIEW








// GET - will be at /blueprint

// router.get('/blueprint', (req ,res, next) => {
//     const { id } = req.params;
//     BlueprintModel.findById(id)
//     .then((path) => res.render('admin/blueprint.hbs', {path}))
//     .catch((err) => console.log(err));
//   })

//doesn't it have to use the UserModel to recognise if the user is an admin?


module.exports = router;
