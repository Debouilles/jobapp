import express from "express";
import mongoose from "mongoose";
// import { v4 as uuid } from 'uuid';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticate } from "./login.js";
const ObjectId = mongoose.Types.ObjectId;


//liste des users
// import{ users } from '../Users.js';

//model user
import { User } from "../model/User.js";


const router = express.Router();

// let users = require("../Users");

//Middlewares------------------------------------------

 function failedOperationOnId(res, userID) {
  return res.status(404).type('text').send(userID + ' is an invalid ID');
}

async function loadAll(req, res, next) {
  const user = await User.find();
  res.send(user)
}

export async function idCheckValidity(id){
  let theUser = id;
  if (!ObjectId.isValid(id)) {
    return failedOperationOnId(res, theUser);
  }
  // const user = await User.findById(req.params.id)
  // if (!user) {
  //   return failedOperationOnId(res, theUser);
  // }

}

async function loadFromID(req, res, next) {
  let theUser = req.params.id;
  if (!ObjectId.isValid(theUser)) {
    return failedOperationOnId(res, theUser);
  }


  const user = await User.findById(req.params.id)
  if (!user) {
    return failedOperationOnId(res, theUser);
  }

  req.user = user;
  next();
}

//ROUTES----------------------------------------------------

// router.get("/", function (req, res, next) {
//   res.send("Got a response from the users route");
// });

// GET
// /users
// router.get("/", (req, res) => { //authenticate
//   const currentUserId = req.currentUserId;
//   User.find().sort('name').exec(function (err, users) {
//     if (err) {
//       return next(err);
//     }
//     res.send(users);
//   });
// });

// router.get("/", async (req, res, next) => {
//   try {
//     const users = await User.find({}).sort('name');
//     res.send(users)
//     res.status(200)
//   } catch (e) {
//     next(e)
//   }
// });


router.get("/", loadAll, async (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
});




//  GET 
// /users/:id
router.get("/:id", loadFromID, async (req, res, next) => {
  try {

    User.aggregate([
      {
        $match: {
          _id: ObjectId(req.params.id)

        }
      },
      {
        $lookup: {
          from: 'services',
          localField: '_id',
          foreignField: 'provider',
          as: 'proposedServices'
        }
      },
      {
        $unwind: {
          path: '$proposedServices',
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          proposedServices: { $sum: 1 }
        }
      }
    ], function (err, results) {
      if (err) {
        next(err)
      }
      res.send(results)
    });
  } catch (e) {
    // res.send(e)
    next(e)
  }
});


router.post("/", function (req, res, next) {
  const plainPassword = req.body.password;
  const costFactor = 10;
  bcrypt.hash(plainPassword, costFactor, function (err, hashedPassword) {
    if (err) {
      return next(err);
    }
    const newUser = new User(req.body);
    newUser.password = hashedPassword;
    newUser.save(function (err, savedUser) {
      if (err) {
        return next(err);
      }
      res.send(savedUser);
    });
  });
});

//  PUT 
// /users/:id
router.put("/:id", async (req, res, next) => {
  let modif = req.body
  try {
    await User.findByIdAndUpdate(req.params.id, modif)
  } catch (e) {
    res.send(e)
  }


});

//  DELETE 
// /users/:id
router.delete("/:id", async (req, res, next) => {

  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200)
    res.send(user);
  } catch (e) {
    res.send(e)
  }


});


export default router;
