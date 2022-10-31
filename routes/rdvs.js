
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from "express";
import mongoose from "mongoose";
// const User = require('./User')
// import User from ('./User.js')





const router = express.Router();

if (process.env.ENV === 'dev') require('dotenv').config()

const connection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//added code------------------------
// const express = require("express");

// const app = express();

// app.use(express.json());

// app.use(express.urlencoded({ extended: false }));

// app.use("/api/users", require("./routes/api/users"));

// app.listen(3000, () => console.log('Server started'));
//end added code----------------------

router.get("/", function (req, res, next) {
  res.send("Ignition!");
});

export default router;
