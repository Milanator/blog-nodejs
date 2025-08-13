import { expect } from "chai";
import sinon from "sinon";
import userController from "./../controllers/userController.ts";
import User from "./../models/user.ts";
import database from "../plugins/database.ts";
import bcrypt from "bcryptjs";

describe("User Controller", () => {
  it("Login - fail - database", async () => {
    sinon.stub(User, "findOne");

    User.findOne.throws();

    const req = {
      body: {
        email: "email",
        password: "password",
      },
    };

    const response = await userController.login(req, {}, () => {});

    expect(response).to.be.an("error");

    expect(response).to.have.property("statusCode", 500);

    User.findOne.restore();
  });

  it("Login - success - testing DB", async () => {
    await database(
      "mongodb+srv://navratilmilann:XwuSFq3KLQgRjQvs@nodejs-course.t5lqqq6.mongodb.net/mongo_testing?retryWrites=true&w=majority&appName=blog-nodejs"
    );

    const req = {
      body: {
        name: "Milan",
        email: "test@test.com",
        password: "Test1234",
      },
    };

    const res = {
      status: function () {
        return this;
      },
      json: () => ({ message: "test", error: 0, data: req.body }),
    };

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password,
    });

    const response = await userController.login(req, res, () => {});

    expect(response).to.have.property("error", 0);
    expect(response).to.have.property("data");
    expect(response).to.have.property("message");
  });
});
