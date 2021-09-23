const router = require("express").Router();
const ThingshuiModel = require("../models/Thingshui.model");

// ********* require fileUploader in order to use it *********
const imageUploader = require('../config/cloudinary.config');

router.get("/thingshui", (req, res, next) => {
    ThingshuiModel.find().then((thingshuis) => {
        res.render("thing-shui/library-ts.hbs", {thingshuis});
    });
});

router.get("/thingshui/create", (req, res, next) => {
    res.render("thing-shui/add-ts.hbs");
});
  
router.post("/thingshui/create", imageUploader.single('imageUrl') ,(req, res, next) => {
    const image = req.file.path; // is this correct?
    const { title, description } = req.body; // and the image?
    ThingshuiModel.create({title, description, image })
    .then((freshlyCreatedThing) => {
        res.redirect(`/thingshui/${freshlyCreatedThing._id}`); // back to the library where they are all displayed 
    })
    .catch((err) => {
      next(err)
    });
});

router.get("/thingshui/:id", (req, res, next) => {
    ThingshuiModel.findById(req.params.id).populate()
        .then((thing) => {
          res.render("thing-shui/thing.hbs", { thing });
        });
});

router.post('/thingshui/:id/delete', (req, res) => {
    const { id } = req.params;
    ThingshuiModel.findByIdAndDelete(id)
        .then(() => { 
            res.redirect(`/thingshui`);
         })
        .catch((err) => {
            console.log(err);
        });
})


// only if they log in <3 

module.exports = router;
