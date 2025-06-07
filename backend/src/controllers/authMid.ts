import pkg from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../types/admin.js";
import { Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { verify } = pkg;

export const authMid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwt_sec: string | undefined = process.env.JWT_SEC;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: "token not found",
    });
  }

  try {
    //@ts-ignore
    verify(token, jwt_sec, (err, decode) => {
      if (err) {
        return res.status(StatusCode.UNAUTHORIZED).json({
          message: "Invalid token",
        });
      } else {
        //@ts-ignore
        req.body.user = new Types.ObjectId(decode);

        next();
      }
    });
  } catch (error: any) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
