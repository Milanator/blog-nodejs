import Post from "../models/post.ts";
import User from "../models/user.ts";

export function canModify(user: User, post: Post): boolean {
  return post.userId._id.toString() === user._id.toString();
}