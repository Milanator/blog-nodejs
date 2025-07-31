import User from "../models/user.ts";
import bcrypt from "bcryptjs";
import { getError } from "../utils/error.ts";
import validator from "validator";

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

  async createUser({ userInput }, req) {
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
};
