const router = require("express").Router();
const BlueprintModel = require("../models/Blueprint.model");
// const PathModel = require("../models/Path.model");
// const StageModel = require("../models/Stage.model");


   // GET - will be at /blueprint
router.get('/blueprint', (req ,res, next) => {
    res.render('admin/blueprint.hbs');
})

    // GET - will be at /blueprint
/*
router.get('/blueprint', (req ,res, next) => {
    const { id } = req.params;
    BlueprintModel.findById(id)
    .then((path) => res.render('admin/blueprint.hbs', {path}))
    .catch((err) => console.log(err));
  })
*/

  //doesn't it have to use the UserModel to recognise if the user is an admin?

  //then we CREATE a post model -- because we want to send it to the DB?
router.post('/blueprint', (req ,res, next) => {
    const { type, description, title, admin_id, stages } = req.body
    BlueprintModel.create({ type, description, title, admin_id, stages }) // have to first be destructed FROM req.body 
     .then((data) => res.redirect('/'))
     .catch((err) => console.log(err));
   })

   module.exports = router;