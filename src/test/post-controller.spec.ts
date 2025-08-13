import { expect } from "chai";
import postController from "./../controllers/postController.ts";
import User from "./../models/user.ts";
import database from "../plugins/database.ts";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

describe("Post Controller", () => {
  const email = "test@test.com";
  const name = "Milan";
  const rawPassword = "Test1234";
  const userId = "689c39adccb85649bf84cac0";

  // run once in file
  before(async () => {
    await database(
      "mongodb+srv://navratilmilann:XwuSFq3KLQgRjQvs@nodejs-course.t5lqqq6.mongodb.net/mongo_testing?retryWrites=true&w=majority&appName=blog-nodejs"
    );

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(rawPassword, salt);

    await User.create({
      name,
      email,
      password,
      _id: userId,
    });
  });

  it("[TESTING-DB] Store post", async () => {
    const req = {
      body: {
        text: "Hello",
      },
      file: {
        path: "ABC",
      },
      user: {
        _id: userId,
      },
    };

    const res = {
      status: function () {
        return this;
      },
      json: function (data: any) {
        return data;
      },
    };

    const response = await postController.store(req, res, () => {});

    expect(response).to.have.property("error", 0);
    expect(response).to.have.property("message");
    expect(response).to.have.property("data");
  });

  // run once in file
  after(async () => {
    await User.deleteMany({});

    mongoose.disconnect();
  });
});
