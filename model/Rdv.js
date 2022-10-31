import { Schema, model } from "mongoose"
import mongoose from "mongoose";
let rdvSchema = new Schema({
  //RDV ID pour plus tard
  RDV_ID: {
    type: Number,
    required: [true, 'You must provide an ID']
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reciever:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
