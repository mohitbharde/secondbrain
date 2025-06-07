import { Request, Response } from "express";
import { User } from "../db/Users.js";
import { hashSync } from "bcrypt-ts";
import { z } from "zod";
import { StatusCode } from "../types/admin.js";

const hash_salt = process.env.HASH_SALT;

const UserProfile = z.object({
  email: z.string().min(3).max(84).email({ message: "email is required" }),
  password: z.string().min(2).max(128),
});

export const SignUp = async (req: Request, res: Response) => {
  const zod = UserProfile.safeParse(req.body);
  if (!zod.success) {
    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ message: zod.error.issues });
  }

  const { email, password } = zod.data;

  try {
    const user = await User.findOne({ username: email });
    if (user) {
      res.status(StatusCode.FORBIDDEN).json({
        message: "User already exists with this username",
      });
    }

    const hashPassword = hashSync(password, hash_salt);

    const response = await User.create({
      username: email,
      password: hashPassword,
    });

    if (response) {
      res
        .status(StatusCode.CREATED)
        .json({ message: "User created successfully" });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
