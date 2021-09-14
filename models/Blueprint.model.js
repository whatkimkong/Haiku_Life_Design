const { Schema, model } = require("mongoose");

const blueprintSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: [
      "clothing, shoes & accessories",
      "electronics & cables",
      "kitchen",
      "bathroom",
      "paperwork",
      "books",
      "sentimental",
      "miscellaneous",
    ],
  },
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  stages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Stage",
    },
  ],

  // created: {
  //     type: Timestamp,
  //   },
});

// stages?? where do they come into???

const Blueprint = model("Blueprint", blueprintSchema);
module.exports = Blueprint;
