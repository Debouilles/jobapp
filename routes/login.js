import { User } from "../model/User.js"
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const secretKey = process.env.SECRET_KEY || "changeme";


export function authenticate(req, res, next) {
  // Ensure the header is present.
  const authorization = req.get("Authorization");
  if (!authorization) {
    return res.status(401).send("Authorization header is missing");
  }
  // Check that the header has the correct format.
  const match = authorization.match(/^Bearer (.+)$/);
  if (!match) {
    return res.status(401).send("Authorization header is not a bearer token");
  }
  // Extract and verify the JWT.
  const token = match[1];
  jwt.verify(token, secretKey, function (err, payload) {
    if (err) {
      return res.status(401).send("Your token is invalid or has expired");
    } else {
      req.currentUserId = payload.sub;
      next(); // Pass the ID of the authenticated user to the next middleware.
    }
  });
}




router.post("/", async function (req, res, next) {
  User.findOne({ email: req.body.email }).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.sendStatus(401);
    }
    bcrypt.compare(req.body.password, user.password, function (err, valid) {
      if (err) {
        return next(err);
      } else if (!valid) {
        return res.sendStatus(401);
      }
      // Login is valid...
      // res.send(`Welcome ${user.name}!`);
      // Retrieve the secret key from your configuration.
      // Generate a valid JWT which expires in 7 days.
      const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
      const payload = { sub: user._id.toString(), exp: exp };
      jwt.sign(payload, secretKey, function (err, token) {
        // console.log("Payload:" + payload + " secret:" + secretKey)
        // console.log(token)
        if (err) { return next(err); }
        res.send({ token: token, user: user}); // Send the token to the client.
      });
    });
  })
});

export default router;