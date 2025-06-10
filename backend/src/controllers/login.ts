import { Request, Response } from "express";
import pkg from "jsonwebtoken";
import { User } from "../db/Users.js";
import { compareSync } from "bcrypt-ts";
import { z } from "zod";
import { StatusCode } from "../types/admin.js";
import dotenv from "dotenv";
dotenv.config();

const UserProfile = z.object({
  username: z.string().min(3).max(84),
  password: z.string().min(2).max(128),
});

const { sign } = pkg;
const jwt_sec = process.env.JWT_SEC || "null";

export const login = async (req: Request, res: Response) => {
  const zod = UserProfile.safeParse(req.body);

  if (!zod.success) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ message: zod.error.issues });
  }

  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const compare = compareSync(password, user.password);
    if (!compare) {
      return res
        .status(StatusCode.UNAUTHORIZED)
        .json({ message: "Invalid password" });
    }

    const token = sign(user._id.toString(), jwt_sec);
    if (!token) {
      return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message: "Error generating token",
      });
    }

    req.headers.authorization = token;

    return res.status(StatusCode.OK).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error: any) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: "error while login ",
      error: error.message,
    });
  }
};
