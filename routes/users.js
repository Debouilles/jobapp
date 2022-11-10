import express from "express";
import mongoose from "mongoose";
// const express = require("express");
// const uuid = require("uuid");


//liste des users
// import{ users } from '../Users.js';

//model user
import { User } from "../model/User.js";


const router = express.Router();

// let users = require("../Users");

//SCHEMA------------------------------------------



//ROUTES----------------------------------------------------

// router.get("/", function (req, res, next) {
//   res.send("Got a response from the users route");
// });

// GET
// /users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({})
    res.status(200)
    res.send(users);
  } catch(e) {
    res.send(e)
  }
});

//  GET 
// /users/:id
router.get("/:id", (req, res) => {
  //finds user by ID
  User.findById(req.params.id, function (err, user) {
    //return erreur si pas trouvé
    if (err) return res.sendStatus(404)
    return res.json(user)
  });
});

//  POST 
// /users
router.post("/", (req, res) => {
  // id: uuid.v4(),
  const newUser = new User({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  newUser
    .save()
    .then(
      () => console.log("One entry added"),
      (err) => console.log(err),
      res.sendStatus(200)
    );

  // if (!newUser.id || !newUser.name || !newUser.email) {
  //   return res.sendStatus(400);
  // }
  return res.sendStatus(200)
});

//  PUT 
// /users/:id
router.put("/:id", (req, res) => {
  let theObject = {}
  if (req.body.name) {
    theObject.name = req.body.name
    console.log('hello')
  }
  if (req.body.email) {
    theObject.email = req.body.email
  }
  console.log(theObject)

  User.findByIdAndUpdate(req.params.id, theObject, function (err, user) {
    if (err) {
      console.log(err)
      res.sendStatus(400);
    }
    else {
      res.sendStatus(200);
    }
  });

});

//  DELETE 
// /users/:id
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id, function (err, user) {
    if (err) {
      console.log(err)
      res.sendStatus(400)
    }
    else {
      console.log("Deleted : ", user);
      res.sendStatus(200)
    }
  });
});


export default router;
