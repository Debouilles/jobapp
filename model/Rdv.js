import { Schema, model } from "mongoose"
import mongoose from "mongoose";
let rdvSchema = new Schema({
  //RDV ID pour plus tard
  relatedService: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service',
    required: [true, 'You must provide a Service']
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You must provide a provider user']
  },
  reciever:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'You must provide a reciever user']
  },
  isAccepted: {
    type: Boolean,
    default: false

  }
});


export const RDV = model('RDV', rdvSchema)
// export const User = mongoose.model('User', userSchema)

// module.exports = User
// export default User;
