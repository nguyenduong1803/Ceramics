import mongoose, { Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const NewsSchema = new Schema(
  {
    img: {
      type: String,
      require: true,
    },
    published: {
      type: Boolean,
      require: false,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    detail_news: {
      type: String,
    },
    author: {
      type: String,
      require: true,
    },
    is_locked: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

NewsSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("news", NewsSchema);
