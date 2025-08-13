import { expect } from "chai";
import sinon from "sinon";
import userController from "./../controllers/userController.ts";
import User from "./../models/user.ts";
import database from "../plugins/database.ts";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

describe("User Controller", () => {
  const email = "test@test.com";
  const name = "Milan";
  const rawPassword = "Test1234";

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
      _id: "689c39adccb85649bf84cac0",
    });
  });

  beforeEach(() => {});

  it("[STUBS] Login - failed", async () => {
    sinon.stub(User, "findOne");

    User.findOne.throws();

    const req = {
      body: {
        email,
        password: rawPassword,
      },
    };

    const response = await userController.login(req, {}, () => {});

    expect(response).to.be.an("error");

    expect(response).to.have.property("statusCode", 500);

    User.findOne.restore();
  });

  it("[TESTING-DB] Login", async () => {
    const req = {
      body: {
        name,
        email,
        password: rawPassword,
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

    const response = await userController.login(req, res, () => {});

    expect(response).to.have.property("error", 0);
    expect(response).to.have.property("data");
    expect(response).to.have.property("message");
  });

  afterEach(() => {});

  // run once in file
  after(async () => {
    await User.deleteMany({});

    mongoose.disconnect();
  });
});
