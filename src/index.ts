import { getDB } from "./lib/db";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routers from "./routers";
dotenv.config();
const db = getDB();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
const PORT = 8008;

app.use("/", routers());
app.listen(PORT, () => console.log(`Server is running in port: ${PORT}`));
