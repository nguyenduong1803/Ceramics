import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const BillSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      autopopulate: { select: "_id fullname" },
    },
    address: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true, 
    },
    note: {
      type: String,
    },
    total_money: {
      type: Number,
      required: true,
    },
    payment_id: {
      type: mongoose.Types.ObjectId,
      ref: "payment",
      autopopulate: { select: "_id status payment_method" },
    },
  },
  {
    timestamps: true,
  }
);
BillSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("bill", BillSchema);
