import mongoose from "mongoose";
import user from "./user.ts";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema(
  {
    text: {
      type: String,
    },
    imageUrl: {
      type: String,
      get: function (imageUrl: string) {
        return `${process.env.BACKEND_ORIGIN}/${imageUrl}`;
      },
    },
    userId: { type: ObjectId, ref: user.modelName },
  },
  {
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

export default mongoose.model("Post", schema);
