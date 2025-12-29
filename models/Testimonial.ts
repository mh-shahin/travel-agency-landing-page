import { Schema, model, models } from 'mongoose';

const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String, required: true },
  featured: { type: Boolean, default: true },
}, { timestamps: true });

export const Testimonial = models.Testimonial || model('Testimonial', TestimonialSchema);