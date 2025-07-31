import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import type { Request } from "express";
import { getError } from "../utils/error.ts";
import { JWT_PRIVATE_KEY } from "../constants.ts";
import User from "../models/user.ts";

type ErrorType = {
  message: string;
};

export default {
  firstExample() {
    return {
      message: "Hello world",
      views: 123,
    };
  },

  async signUp({ userInput }, req: Request) {
    // validation
    const errors: ErrorType[] = [];

    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "Email is invalid" });
    }

    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: "Password is too short" });
    }

    if (errors.length > 0) {
      throw getError(errors[0].message);
    }

    const existingUser = await User.findOne({ email: userInput.email });

    if (existingUser) {
      throw getError("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(userInput.password, salt);

    const user = await User.create({
      name: userInput.name,
      email: userInput.email,
      password,
    });

    return user;
  },

  async login({ userInput }, req: Request) {
    // validation
    const errors: ErrorType[] = [];

    if (errors.length > 0) {
      throw getError(errors[0].message);
    }

    const user = await User.findOne({ email: userInput.email });

    if (!user) {
      throw getError("User doesnt exist");
    }

    const matchPassword = await bcrypt.compare(
      userInput.password,
      user.password
    );

    if (!matchPassword) {
      throw getError("Incorrect password");
    }

    // generate token
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        _id: user._id.toString(),
      },
      JWT_PRIVATE_KEY,
      { expiresIn: "1h" }
    );

    return {
      token,
      user,
      message: "Succesfully authenticated",
    };
  },
};
