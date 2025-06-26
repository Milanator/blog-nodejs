import mongoose from "mongoose";

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
  userId: { type: ObjectId, ref: "User" },
});

export default mongoose.model("Post", schema);
