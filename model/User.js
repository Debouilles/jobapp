
// const { Schema, model } = require('mongoose')
import { Schema, model } from "mongoose"

let userSchema = new Schema({
  id: {
    type: String,
    required: [true, 'You must provide an ID']
  },
  name: {
    type: Schema.Types.String,
    required: [true, 'You must provide a name']
  },
  email: {
    type: Schema.Types.String,
    required: [true, 'Email address is required']
  },
  password: {
    type: Schema.Types.String,
    required: [true, 'You must provide a password']
  }
});

//For external ids !! 
//https://stackoverflow.com/questions/18001478/referencing-another-schema-in-mongoose

// userSchema.virtual('password');
// userSchema.pre('save', async function);

export const User = model('User', userSchema)

