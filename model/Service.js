
import mongoose, { Schema, model } from "mongoose";

let serviceSchema = new Schema({
    titre: {
        type: String,
        required: [true, 'You must provide an ID'],
        minlength: 3,
        maxlength: 30
    },
    type: {
        type: String,
        required: [true, 'You must provide a type'],
        enum: ['Assistance', 'Promenade', 'Jardinage', 'Prêt']
    },
    date: {
        type: Date,
        required: [true, 'You must provide a date']
    },
    provider:
    {
      type: mongoose.ObjectId,
      ref: 'User'
    },
    location:
{    type: {
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
      }}
});

// Validation GeoJSON------------------------
serviceSchema.index({ location: '2dsphere' });

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