import { Request, Response } from "express";
import { Content } from "../db/Content.js";
import { Tags } from "../db/Tags.js";
import { StatusCode } from "../types/admin.js";

export const getContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.find({ username: req.body.user })
      .populate("tags")
      .populate("username")
      .exec();
    // console.log("content type is " + typeof content);
    // console.log("Content  :" + content);
    if (!content) {
      return res
        .status(StatusCode.NOT_FOUND)
        .json({ message: "Content not found" });
    }

    return res.status(StatusCode.OK).json({
      message: " your content with is here",
      content,
    });
  } catch (error: any) {
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
