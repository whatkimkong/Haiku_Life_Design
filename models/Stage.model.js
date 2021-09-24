const { Schema, model } = require("mongoose");

const stageSchema = new Schema({
  title: {
    type: String,
    required: true, // eg STAGE 1
  },
  description: {
    type: String,
    required: true,
  },
  tip: {
    type: String,
  }
});

    // finished: { // after last stage
    // type: Date,
    // default: Date.now,
    // },

module.exports = model("Stage", stageSchema);