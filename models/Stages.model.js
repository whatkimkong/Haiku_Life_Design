const { Schema, model } = require("mongoose");

const stagesSchema = new Schema({
  username: {
    type: String,
    // can we take it rather than create it ??
  },
  email: {
    type: String,
  },
  started: {
    type: Date,
    default: Date.now,
  },
  afterImage: {
    type: String, // >> UPLOAD IMAGES >> HOW???
    // default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
});

    // finished: { // after last stage
    // type: Date,
    // default: Date.now,
    // },

const Stages = model("Stages", stagesSchema);

module.exports = Stages;