import express from "express";
import createError from "http-errors";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import rdvsRouter from "./routes/rdvs.js";
import servicesRouter from "./routes/services.js";

import mongoose from "mongoose";
// const mongoose = require("mongoose");
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

// Import models

// demander pourquoi je l'ai 2x
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


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler--------------------------------
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  //ici gestion de l'ID not found------
  if(err.kind == 'ObjectId' && !err.status){
    err.status = 404;
    // err.message = "This ressource doesn't exist"
  }
  res.status(err.status || 500);
  // Send the error status
  res.send(err.message); //QUESTION !! Ici remplacer le message d'erreur?
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
