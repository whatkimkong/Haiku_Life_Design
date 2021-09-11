const router = require("express").Router();
const PathModel = require("../models/Path.model");

// GET - will be at /posts/add
router.get('/path', (req ,res, next) => {
    const { pathTypes } = req.params;
    PathModel.findById(pathTypes)
    .then((path) => res.render('paths/add-path.hbs', {path}))
    .catch((err) => console.log(err));
  })

// image upload js
  let loadFile = function(event) {
	let image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};

   module.exports = router;