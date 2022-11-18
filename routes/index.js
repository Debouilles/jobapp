
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from "express";
import mongoose from "mongoose";




const router = express.Router();

if (process.env.ENV === 'dev') require('dotenv').config()

const connection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


//end added code----------------------

router.get("/", function (req, res, next) {
  res.send("Ignition!");
});

export default router;
