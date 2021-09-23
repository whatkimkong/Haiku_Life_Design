const { Schema, model } = require("mongoose");

const thingshuiSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
},
  {
    timestamps: true,
  }
);

// stages?? where do they come into???
module.exports = model("Thingshui", thingshuiSchema);