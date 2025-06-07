import express from "express";
import { connect } from "mongoose";
import { SignUp } from "./controllers/Signup.js";
import { login } from "./controllers/login.js";
import dotenv from "dotenv";
import { authMid } from "./controllers/authMid.js";
import { postContent } from "./controllers/postContent.js";
import { getContent } from "./controllers/getContent.js";
import { deleteContent } from "./controllers/deleteContent.js";
import { createShare } from "./controllers/createShare.js";
import { share } from "./controllers/share.js";
import cors from "cors";
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const url: string = process.env.DB_URL || "mongodb://127.0.0.1:27017/brainly";

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//@ts-ignore
app.post("/api/v1/signup", SignUp);
//@ts-ignore
app.post("/api/v1/login", login);
//@ts-ignore
app.post("/api/v1/content", authMid, postContent);
//@ts-ignore
app.get("/api/v1/content", authMid, getContent);
//@ts-ignore
app.delete("/api/v1/deleteContent", authMid, deleteContent);
//@ts-ignore
app.post("api/v1/share", authMid, createShare);
//@ts-ignore
app.get("/api/v1/brain/:shareLink", authMid, share);

async function connectDb() {
  try {
    const c = await connect(url);
    if (c) return "Connected to MongoDB , url: " + JSON.stringify(c);
    else return "Failed to connect to MongoDB";
  } catch (e) {
    return e;
  }
}
const m = await connectDb();
console.log(JSON.stringify(m));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
