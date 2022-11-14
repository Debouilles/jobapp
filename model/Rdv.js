import { Schema, model } from "mongoose"
import mongoose from "mongoose";
let rdvSchema = new Schema({
  //RDV ID pour plus tard
  relatedService: {
    type: mongoose.ObjectId,
    ref: 'service',
    required: [true, 'You must provide a Service']
  },
  provider: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: [true, 'You must provide a provider user']
  },
  reciever:
  {
    type: mongoose.ObjectId,
    ref: 'User',
    required: [true, 'You must provide a reciever user']
  },
  isAccepted: {
    type: Boolean,
    default: false

  }
});

serviceSchema.set("toJSON", {
  transform: transformJsonRdv
});

function transformJsonRdv(doc, json, options) {
  // Remove the hashed password from the generated JSON.
  delete json.__v;
  return json;
 }


export const RDV = model('RDV', rdvSchema)
// export const User = mongoose.model('User', userSchema)

// module.exports = User
// export default User;
