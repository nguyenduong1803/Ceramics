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
      require: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

NewsSchema.plugin(mongooseAutoPopulate);
export default mongoose.model("news", NewsSchema);
