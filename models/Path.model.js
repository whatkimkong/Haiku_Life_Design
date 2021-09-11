const { Schema, model } = require("mongoose");

const pathSchema = new Schema({
  username: {
    type: String,
    // can we take it rather than create it ??
  },
  pathType: {
    type: String,
    enum: ["clothing, shoes & accessories", "electronics & cables", "kitchen" , "bathroom" , "paperwork", "books", "sentimental", "miscellaneous"],
  },
  pathDescription: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String, // >> UPLOAD IMAGES >> HOW???
    // default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
});

// stages?? where do they come into???

const Path = model("Path", pathSchema);

module.exports = Path;
