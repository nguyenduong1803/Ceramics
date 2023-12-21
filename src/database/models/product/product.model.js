import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      // required: true,
      autopopulate: { select: "category_name" },
    },
    discount: {
      type: Number,
    },
    priceRoot: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    is_locked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongooseAutoPopulate);

export default mongoose.model("product", ProductSchema);
