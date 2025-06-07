import { Schema, model, Types } from "mongoose";

interface Content {
  title: string;
  link: string;
  type: string;
  username: Types.ObjectId;
  tags: [Types.ObjectId];
}

const ContentSchema = new Schema<Content>({
  title: { type: String, required: true },
  link: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "image",
      "video",
      "article",
      "audio",
      "document",
      "twitter",
      "youtube",
      "link",
      "course",
    ],
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tags" }],
});

export const Content = model<Content>("Content", ContentSchema);
