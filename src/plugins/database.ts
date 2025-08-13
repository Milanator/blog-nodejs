import mongoose from "mongoose";

export default (connection = process.env.DATABASE_CONNECTION) => {
  console.log(connection)
  return mongoose
    .connect(connection)
    .then(() => console.log("🟢 DB connected!"));
};
