
// const { Schema, model } = require('mongoose')
import { Schema, model } from "mongoose"

let userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'You must provide a name']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: [true, 'This Email is already taken']
  },
  password: {
    type: String,
    required: [true, 'You must provide a password']
  }
});

//For external ids !! 
//https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose

// userSchema.virtual('password');
// userSchema.pre('save', async function);

export const User = model('User', userSchema)

