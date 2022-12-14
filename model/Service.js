import {User} from "./User.js"
import mongoose, { Schema, model } from "mongoose";

let serviceSchema = new Schema({
  titre: {
    type: String,
    required: [true, 'You must provide an ID'],
    minlength: 3,
    maxlength: 30
  },

  description: {
    type: String,
    minlength: 5,
    maxlength: 200
  },

  type: {
    type: String,
    required: [true, 'You must provide a type'],
    enum: ['Assistance', 'Promenade', 'Jardinage', 'Prêt', 'Autres']
  },
  date: {
    type: Date,
    required: [true, 'You must provide a date']
  },
  provider:
  {
    type: mongoose.ObjectId,
    ref: 'User',
    validate:
    // Manually validate uniqueness to send a "pretty" validation error
    // rather than a MongoDB duplicate key error
    [
      {
        validator: validateServiceProvider,
        message: 'id {VALUE} does not exists'
      }
    ]
  },
  picture:
  {
    type: String,
  },
  location:
  {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      required: [true, 'You must provide coordinates']
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: validateGeoJsonCoordinates,
        message: '{VALUE} is not a valid longitude/latitude(/altitude) coordinates array'
      }
    }
  }
}, { timestamps: true });

// Validation GeoJSON------------------------
serviceSchema.index({ location: '2dsphere' });

serviceSchema.set("toJSON", {
  transform: transformJsonService
});

function transformJsonService(doc, json, options) {
  // Remove the hashed password from the generated JSON.
  delete json.__v;
  return json;
}

/**
 * Given a name, calls the callback function with true if no person exists with that name
 * (or the only person that exists is the same as the person being validated).
 */
 function validateServiceProvider(value) {
  return User
    .findOne()
    .where('provider')
    .equals(value)
    .exec()
    .then(existingPerson => {
      return existingPerson !== null;
    });
}

export function validateGeoJsonCoordinates(value) {
  return Array.isArray(value) && value.length >= 2 && value.length <= 3 && isLongitude(value[0]) && isLatitude(value[1]);
}

function isLatitude(value) {
  return value >= -90 && value <= 90;
}

function isLongitude(value) {
  return value >= -180 && value <= 180;
}
// ------------------------------------------
export const Service = model('service', serviceSchema)