import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { fileURLToPath } from "url";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import catalogRouter from "./routes/catalog.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_CONN;

async function dbConnect() {
  await mongoose.connect(mongoDB);
}

dbConnect().catch((err) => console.log(err));
// view engine setuimport path from 'path';

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
