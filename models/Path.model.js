const { Schema, model } = require("mongoose");

const pathSchema = new Schema(
  {
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
      required: true,
    },
    title: {
        type: String,
        required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blueprint_id: {
      type: Schema.Types.ObjectId,
      ref: "Blueprint",
    },
    stages: [{
        type: Schema.Types.ObjectId,
        ref: "Stage",
    }],
    images: [String]
},
  {
    timestamps: true,
  }
);

// stages?? where do they come into???
module.exports = model("Path", pathSchema);