import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "EMPLOYEE"],
      default: "USER",
    },
    gender: {
      enum: ["MAN", "FEMAN"],
      type: String,
      default: "MAN",
    },
    is_locked: {
      type: Boolean,
      default: false,
    },
    telephone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods = {
  bcryptPassword(password) {
    if (!password) return "";
    return bcrypt.hashSync(password, 10);
  },
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },
};

UserSchema.pre("save", function (next) {
  this.password = this.bcryptPassword(this.password);
  next();
});

export default mongoose.model("users", UserSchema);
