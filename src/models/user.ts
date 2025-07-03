import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

export default mongoose.model("User", schema);
