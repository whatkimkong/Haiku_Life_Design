const router = require("express").Router();
const PathModel = require("../models/Path.model");
const BlueprintModel = require("../models/Blueprint.model");
const StageModel = require("../models/Stage.model");


// GET - will be at /path/add-path
router.get('/path', (req ,res, next) => {
    const { pathTypes } = req.params;
    PathModel.findById(pathTypes)
    .then((path) => res.render('paths/add-path.hbs', {path}))
    .catch((err) => console.log(err));
  })

  // GET - will be at /blueprint
router.get('/blueprint', (req ,res, next) => {
    const { id } = req.params;
    UserModel.findById(id)
    .then((path) => res.render('admin/blueprint.hbs', {path}))
    .catch((err) => console.log(err));
  })

  //then we CREATE a post model -- because we want to send it to the DB?
router.post('/blueprint', (req ,res, next) => {
    const { type, description, title, admin_id, stages } = req.body
    BlueprintModel.create({ type, description, title, admin_id, stages }) // have to first be destructed FROM req.body 
     .then((data) => res.redirect('/'))
     .catch((err) => console.log(err));
   })

  // GET - will be at /stage
router.get('/stage', (req ,res, next) => {
    const { id } = req.params;
    UserModel.findById(id)
    .then((path) => res.render('admin/stage.hbs', {path}))
    .catch((err) => console.log(err));
  })
      
  //then we CREATE a post model -- because we want to send it to the DB?
router.post('/stage', (req ,res, next) => {
    const { title, description, tip } = req.body
    StageModel.create({ title, description, tip  }) // have to first be destructed FROM req.body 
     .then((data) => res.redirect('/'))
     .catch((err) => console.log(err));
   })



// image upload js
//   let loadFile = function(event) {
// 	let image = document.getElementById('output');
// 	image.src = URL.createObjectURL(event.target.files[0]);
// };

   module.exports = router;