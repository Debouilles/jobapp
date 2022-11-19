import express from "express";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticate } from "./login.js";



//model user
import { User } from "../model/User.js";


const router = express.Router();


//Middlewares------------------------------------------


export function verifyOwner(req,res,next){
  const OWNER = req.user.id.toString() === req.currentUserId;
  if (!OWNER) {
    return res.status(403).send('Insufficient permissions')
  }
  next()
}



 function failedOperationOnId(res, userID) {
  return res.status(404).type('text').send(userID + ' is an invalid ID');
}

async function loadAll(req, res, next) {
  const user = await User.find();
  res.send(user)
  next()
}

export async function idCheckValidity(id){
  let theUser = id;
  if (!ObjectId.isValid(id)) {
    return failedOperationOnId(res, theUser);
  }
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


router.get("/", authenticate , loadAll, async (req, res, next) => {
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
    next(e)
  }
});


router.post("/", async function (req, res, next) {
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
      return res.send(savedUser);
    });
  });
});

//  PUT 
// /users/:id
router.patch("/:id", authenticate, verifyOwner, async (req, res, next) => {
  try {
    let modif = req.body
    //gestion password
    if (modif.password !== undefined) {
      const plainPassword = req.body.password;
      const costFactor = 10;
      const hashedPassword = await bcrypt.hash(plainPassword, costFactor)
      modif.password = hashedPassword;
    }
    const theUser = await User.findByIdAndUpdate(req.params.id, modif, { returnDocument: 'after' })
    return res.status(200).send(theUser);
  } catch (e) {
    next(e)
  }
});

//  DELETE 
// /users/:id
router.delete("/:id",authenticate, verifyOwner, async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.status(200).send(user);
  } catch (e) {
    next(e)
  }


});


export default router;
