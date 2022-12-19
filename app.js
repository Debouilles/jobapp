import express from "express";
import createError from "http-errors";
import logger from "morgan";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import rdvsRouter from "./routes/rdvs.js";
import servicesRouter from "./routes/services.js";
import loginRouter from "./routes/login.js";
import cors from "cors";
//openapi
import fs from 'fs';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';

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

// Parse the openapi document.
const openApiDocument = yaml.load(fs.readFileSync('./openapi.yml'));
// Serve the Swagger UI documentation.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use(cors());

// app.use(cors({
//   origin: 'http://yourapp.com'
// }))

// let allowedOrigins = ['https://localhost:8100',
//                       'https://jobapp.onrender.com'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/services", servicesRouter);
app.use("/rdvs", rdvsRouter);
app.use("/login", loginRouter);



//CORS

// error handler---------------------------------------------------------------------------------
app.use(function (err, req, res, next) {
  console.warn(err.stack);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  //ici gestion de l'ID not found---------------------------------??????????????????????????????????????
  if(err.kind == 'ObjectId' && !err.status){
    // err.status = 404;
    res.status(404)
    res.send(err.message)
    // err.message = "This ressource doesn't exist"
    return;
  }

  if(err.name == 'ValidationError'){
    res.status(400)
    res.send(err.message)
    // err.message = "This ressource doesn't exist"
    return;
  }
  
  res.status(err.status || 500);
  // Send the error status
  res.send(err.message); //QUESTION !! Ici remplacer le message d'erreur?
  
});

export default app;
