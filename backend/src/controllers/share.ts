import { Request, Response } from "express";
import { User } from "../db/Users.js";
import { Content } from "../db/Content.js";
import { StatusCode } from "../types/admin.js";
import { Link } from "../db/Link.js";

export const share = async (req: Request, res: Response) => {
  const hash = req.params.shareLink;
  try {
    const link = await Link.findOne({ hash });
    if (!link) {
      res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
      return;
    }

    // Fetch content and user details for the shareable link.
    const content = await Content.find({ username: link.username });
    const user = await User.findOne({ _id: link.username });

    if (!user) {
      res.status(404).json({ message: "User not found" }); // Handle missing user case.
      return;
    }

    res.json({
      username: user.username,
      content,
    });
  } catch (error: any) {
    res.status(StatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
};
