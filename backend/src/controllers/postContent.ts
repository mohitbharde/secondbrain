import { Request, Response } from "express";
import { Content } from "../db/Content.js";
import { Tags } from "../db/Tags.js";
import { ContentType, StatusCode } from "../types/admin.js";

export const postContent = async (req: Request, res: Response) => {
  const { title, type, tags, link }: ContentType = req.body;
  //console.log({ title, type, tags, link });
  try {
    let tagsArray = [];

    for (let i = 0; i < tags.length; i++) {
      const tag = await Tags.findOne({ title: tags[i] });
      if (!tag) {
        const sendTag = await Tags.create({ title: tags[i] });
        tagsArray.push(sendTag._id);
      } else tagsArray.push(tag._id);
    }

    const sendData = await Content.create({
      title,
      type,
      link,
      tags: tagsArray,
      username: req.body.user,
    });

    if (sendData) {
      //console.log(sendData._id);
      return res.status(StatusCode.OK).json({
        id: sendData._id,
        message: "content post successfully",
      });
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        message: "content post failed",
      });
    }
  } catch (error: any) {
    //console.log(error.message);
    res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
