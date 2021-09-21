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

router.post("/thingshui/create", (req, res, next) => {
    const { title, description } = req.body; // and the image?
    ThingshuiModel.create({title, description})
    .then(() => {
        res.redirect(`/thingshui`); // back to the library where they are all displayed 
    })
    .catch((err) => {
      next(err)
    });
});

// only if they log in <3 

module.exports = router;
