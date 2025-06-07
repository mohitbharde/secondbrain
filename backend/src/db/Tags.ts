import { Schema, model } from "mongoose";

interface Tags {
  title: string;
}

const TagsSchema = new Schema<Tags>({
  title: { type: String, required: true, unique: true },
});

export const Tags = model<Tags>("Tags", TagsSchema);
