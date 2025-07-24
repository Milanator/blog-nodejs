import mongoose from "mongoose";
import user from "./user.ts";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const schema = new Schema({
  text: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  userId: { type: ObjectId, ref: user.modelName },
});

schema.methods.setImageUrl = (post: any) => {
  post.imageUrl = `${process.env.BACKEND_ORIGIN}/${post.imageUrl}`;

  return post;
};

export default mongoose.model("Post", schema);
