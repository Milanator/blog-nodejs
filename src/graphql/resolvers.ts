import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import type { Request } from "express";
import { getError } from "../utils/error.ts";
import { JWT_PRIVATE_KEY } from "../constants.ts";
import User from "../models/user.ts";
import Post from "../models/post.ts";
import { getPagination } from "../utils/pagination.ts";
import { clearFile } from "../utils/file.ts";
import path from "path";

type ErrorType = {
  message: string;
};

export default {
  async getPosts({ page, perPage }, { user }) {
    // guest
    if (!user) {
      throw getError("Unauthorized");
    }

    const count = await Post.countDocuments();

    const { skip, totalPages } = getPagination(page, perPage, count);

    // const items = await Post.find({ userId: req.user._id })
    const items = await Post.find()
      .limit(perPage)
      .skip(skip)
      .sort({ _id: "desc" })
      .populate("userId");

    return {
      items,
      totalPages,
      page,
    };
  },

  async storePost({ postInput }, { user }) {
    // guest
    if (!user) {
      throw getError("Unauthorized");
    }

    const errors: ErrorType[] = [];
    const { text, imageUrl } = postInput;

    if (validator.isEmpty(text) || !validator.isLength(text, { min: 3 })) {
      errors.push({ message: "Text is too short" });
    }

    if (errors.length > 0) {
      throw getError(errors[0].message);
    }

    const userId = await User.findOne({ email: user.email });

    const item = await Post.create({
      text,
      imageUrl,
      userId,
    });

    return {
      item,
      message: "Successfuly stored post",
    };
  },

  async signUp({ userInput }) {
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

  async showPost({ id }, { user }) {
    // guest
    if (!user) {
      throw getError("Unauthorized");
    }

    const post = await Post.findOne({ _id: id }).populate("userId");

    return post;
  },

  async updatePost({ id, postInput }, { user }) {
    // guest
    if (!user) {
      throw getError("Unauthorized");
    }

    const post = await Post.findOne({ _id: id }).populate("userId");

    if (post.userId._id.toString() !== user._id.toString()) {
      throw getError("Unauthorized");
    }

    post.text = postInput.text;
    post.imageUrl = postInput.imageUrl;

    const item = await post.save();

    return {
      item,
      message: "Successfuly updated post",
    };
  },

  async deletePost({ id }, { user }) {
    // guest
    if (!user) {
      throw getError("Unauthorized");
    }

    const post = await Post.findOne({ _id: id }).populate("userId");

    if (post.userId._id.toString() !== user._id.toString()) {
      throw getError("Unauthorized");
    }

    // delete file
    const oldFilePath = post.imageUrl.replace(
      process.env.BACKEND_ORIGIN,
      path.resolve()
    );
    clearFile(oldFilePath);

    await Post.deleteOne({ _id: id });

    return {
      message: "Successfuly deleted post",
    };
  },
};
