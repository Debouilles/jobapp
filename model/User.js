
// const { Schema, model } = require('mongoose')
import { Schema, model } from "mongoose"

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'You must provide a name'],
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: [true, 'This Email is already taken'],
    validate:
    // Manually validate uniqueness to send a "pretty" validation error
    // rather than a MongoDB duplicate key error
    [
      {
        validator: validateUserEmailUniqueness,
        message: 'Email {VALUE} already exists'
      }
    ]
  },
  password: {
    type: String,
    required: [true, 'You must provide a password']
  }
});

userSchema.set("toJSON", {
  transform: transformJsonUser
});

function transformJsonUser(doc, json, options) {
 // Remove the hashed password from the generated JSON.
 delete json.password;
 delete json.__v;
 return json;
}

/**
 * Given a name, calls the callback function with true if no person exists with that name
 * (or the only person that exists is the same as the person being validated).
 */
 function validateUserEmailUniqueness(value) {
  return this.constructor
    .findOne()
    .where('email')
    .equals(value)
    .exec()
    .then(existingPerson => {
      return !existingPerson || existingPerson._id.equals(this._id);
    });
}

//For external ids !! 
//https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose

// userSchema.virtual('password');
// userSchema.pre('save', async function);

export const User = model('User', userSchema)
export default User;
