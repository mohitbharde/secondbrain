import { Schema, Types, model } from "mongoose";

interface Link {
  hash: string;
  username: Types.ObjectId;
}

const LinkSchema = new Schema({
  // 'hash' is a string that represents the shortened or hashed version of a link
  hash: String,

  // 'userId' is a reference to the 'User' collection in the database.
  // It uses Mongoose's ObjectId type for relational data.
  // The 'ref' property specifies the referenced collection name ('User').
  // The 'required' property ensures this field must be provided when creating a document.
  // The 'unique' property enforces that each 'userId' in this collection is unique.
  userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
});

export const Link = model<Link>("Link", LinkSchema);
