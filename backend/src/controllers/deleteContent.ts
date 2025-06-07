import { Request, Response } from "express";
import { Content } from "../db/Content.js";
import { StatusCode } from "../types/admin.js";
import { Types } from "mongoose";

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const id = new Types.ObjectId(req.body.id);

    const user = req.body.user;
    const content = await Content.findOne({ _id: id });
    if (!content) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message:
          "Content not found or the content you want to delete is not belong to you",
      });
    }

    const deleteContent = await Content.deleteMany({
      _id: id,
      username: user,
    });
    if (!deleteContent) {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "Content not found",
      });
    }
    return res.status(StatusCode.OK).json({
      id: id,
      message: "Content deleted successfully",
    });
  } catch (error: any) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }
};
