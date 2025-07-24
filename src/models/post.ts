import mongoose from "mongoose";
import user from "./user.ts";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  userId: { type: ObjectId, ref: user.modelName },
});

export default mongoose.model("Post", schema);
