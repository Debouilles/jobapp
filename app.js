import express from "express";
import createError from "http-errors";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import rdvsRouter from "./routes/rdvs.js";
import servicesRouter from "./routes/services.js";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

// Import models

//demander pourquoi je l'ai 2x
mongoose.connect(
  process.env.MONGO_URI, 
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);


const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/services", servicesRouter);
app.use("/rdvs", rdvsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Send the error status
  res.status(err.status || 500);
  res.send(err.message);
});

//MON CODE-----------------------

//note: en local pour test (URI dans .env)
//a faire: mongoDB on cloud



// mongoose.connect(
//   process.env.MONGODB_URI, 
//   {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//   }
// );

export default app;
