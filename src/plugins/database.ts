import mongoose from "mongoose";

export default () => {
  return mongoose
    .connect(process.env.DATABASE_CONNECTION)
    .then(() => console.log("Connected!"));
};
