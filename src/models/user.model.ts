import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "Name need at least 3 characters"],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, "Name need at least 3 characters"],
    },
    email: {
      type: String,
      required: true,
      minLength: [3, "Name need at least 3 characters"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.set("toJSON", {
  transform: (document,Object)=>{
    Object.id = Object._id
    delete Object._id
    delete Object.__v
  }
});
const User = model("User", userSchema);

export default User;
