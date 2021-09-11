const { Schema, model } = require("mongoose");

const stageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tip: {
    type: String,
    required: true,
  }
});

    // finished: { // after last stage
    // type: Date,
    // default: Date.now,
    // },

module.exports = model("Stage", stageSchema);