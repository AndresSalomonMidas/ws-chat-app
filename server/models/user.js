const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  online: {
    type: Boolean,
    default: false,
  },
});

// Add uid property when user is converted to JSON (serialized)
UserSchema.method("toJSON", function () {
  // eslint-disable-next-line no-unused-vars
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("User", UserSchema);
