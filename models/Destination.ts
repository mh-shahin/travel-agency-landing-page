import { Schema, model, models } from 'mongoose';

const DestinationSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  price: { type: Number, required: true },
  description: { type: String },
  featured: { type: Boolean, default: true },
}, { timestamps: true });

export const Destination = models.Destination || model('Destination', DestinationSchema);
