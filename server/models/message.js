const { Schema, model } = require("mongoose");

const MessageSchema = Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "from is required"],
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "to is required"],
    },
    message: {
      type: String,
      required: [true, "message is required"],
    },
  },
  {
    timestamps: true,
  },
);

// TODO: Add toJSON
MessageSchema.method("toJSON", function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Message", MessageSchema);
