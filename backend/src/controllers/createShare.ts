import { json, Request, Response } from "express";
import { Link } from "../db/Link.js";
import { StatusCode } from "../types/admin.js";
import { random } from "./util.js";

export const createShare = async (req: Request, res: Response) => {
  try {
    const share = req.body.share;
    if (share) {
      const existingLink = await Link.findOne({ userId: req.body.user });
      if (existingLink) {
        return res.status(StatusCode.OK).json({ hash: existingLink.hash }); // Send existing hash if found.
      }

      const hash = random(10);
      await Link.create({ userId: req.body.user, hash });
      res.status(StatusCode.OK).json({ hash });
    } else {
      await Link.deleteOne({ userId: req.body.user });
      res.status(StatusCode.OK).json({
        message: "Share deleted successfully",
      });
    }
  } catch (error: any) {
    res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
