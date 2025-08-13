import mongoose from "mongoose";

export default (connection = process.env.DATABASE_CONNECTION) => {
  return mongoose
    .connect(connection)
    .then(() => console.log("🟢 DB connected!"));
};
