import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    about: {
      type: String,
    },
    phone: {
      type: Number,
    },
    history: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
